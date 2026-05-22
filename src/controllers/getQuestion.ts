import { getSessionModel, restoreDBConnection } from '@/db';
import type { Question, UnansweredQuestion } from '@/globalTypes';
import { shuffle } from '@/util';
import questions from '@content/questions.json';

export default async function getQuestion(
  userEmail: string,
  questionPosition: number,
): Promise<Question | UnansweredQuestion> {
  await restoreDBConnection();

  if (questionPosition >= Number(process.env.QUESTIONS_PER_SESSION ?? 3)) {
    throw new Error('Invalid question position');
  }

  const session = await getSessionModel().getSession(userEmail);

  if (questionPosition >= session.questions.length) {
    throw new Error('Invalid question position');
  }

  const sessionQuestion = session.questions[questionPosition];

  if (!sessionQuestion) {
    throw new Error('Invalid question position');
  }

  const question = questions.find(({ id }) => id === sessionQuestion.questionId) as unknown as Question;

  if (!question) {
    throw new Error('Invalid question');
  }

  const shuffledOptions = Object.keys(question.options)
    .map((key) => ({
      [key]: shuffle(question.options[key], session.seed),
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});

  if (sessionQuestion.answer) {
    return {
      ...question,
      answer: shuffle(
        Array.from({ length: question.options['en-EN'].length }, (_, i) => i),
        session.seed,
      ).indexOf(question.answer),
      options: shuffledOptions,
    } as Question;
  }

  return {
    availableLanguages: question.availableLanguages,
    code: question.code,
    id: question.id,
    options: shuffledOptions,
    question: question.question,
  } as UnansweredQuestion;
}
