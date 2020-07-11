import questions from "../questions.json";
import { getStoredAnswers, submitQuestion } from "../antiCheatSystem";
import { randomBetween } from "../util";
import { Question, StoredAnswer, SafeQuestion } from "../types";

export interface QuestionsAPI {
  currentQuestion: SafeQuestion;
  previousQuestions: Question[];
  submitAnswer: (answer: number) => Promise<AnswerResponse>;
}

export type AnswerResponse = { api: QuestionsAPI, rightAnswer: Question, myAnswer: StoredAnswer };

export async function loadQuestions(
  locale: string,
  previousQuestions: Question[] = [],
): Promise<QuestionsAPI> {
  const content = questions.find(({ language }) => locale === language);

  if (!content) {
    throw new Error(`${locale} is not an available`);
  }

  const storedAnswers = getStoredAnswers(locale);
  const questionsToIgnore = storedAnswers
    .slice(0, Math.floor(content.list.length * .5))
    .map(({ id }) => id);

  const nextQuestionId = randomBetween(0, content.list.length, questionsToIgnore);

  const currentQuestion = content.list.find(({ id }) => nextQuestionId === id);

  if (!currentQuestion) {
    throw new Error('Unexpected error');
  }

  const { answer, explanation, ...safeQuestion } = currentQuestion;

  const startDate = Date.now();

  const submitAnswer = async (answer: number): Promise<AnswerResponse> => {
    const endDate = Date.now();

    const myAnswer = await submitQuestion({
      answer,
      date: Date.now(),
      id: currentQuestion.id,
      locale,
      time: endDate - startDate,
    });

    const api = await loadQuestions(locale, [...previousQuestions, currentQuestion]);

    return {
      api,
      rightAnswer: currentQuestion,
      myAnswer,
    };
  };

  return {
    currentQuestion: safeQuestion,
    previousQuestions,
    submitAnswer,
  }
}
