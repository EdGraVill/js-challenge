import { getSessionModel, restoreDBConnection } from '@/db';
import type { Question } from '@/globalTypes';

import getQuestion from './getQuestion';

const questionsPerSession = Number(process.env.QUESTIONS_PER_SESSION ?? 3);

export default async function answerQuestion(userEmail: string, answer: number): Promise<Question> {
  await restoreDBConnection();

  const session = await getSessionModel().getSession(userEmail);

  if (!session) {
    throw new Error('Session not found');
  }

  if (session.questions.length >= questionsPerSession && session.questions[questionsPerSession - 1].answer) {
    throw new Error('Session already completed');
  }

  const question = session.questions[session.questionsAnswered];

  question.answer = answer;
  question.answeredAt = new Date();
  session.questionsAnswered += 1;

  await session.save();

  return getQuestion(userEmail, session.questionsAnswered - 1) as Promise<Question>;
}
