import questions from '@content/questions.json';
import { randomInt } from 'crypto';
import type { Document, Model } from 'mongoose';
import { Schema, model, models } from 'mongoose';

const questionsPerSession = Number(process.env.QUESTIONS_PER_SESSION ?? 3);

interface Question {
  answer?: number;
  answeredAt?: Date;
  previousAnswer?: number;
  questionId: number;
  startedAt: Date;
}

export interface SessionType {
  questions: Question[];
  questionsAnswered: number;
  seed: number;
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };
  userEmail: string;
}

const questionSchema = new Schema<Question>({
  answer: {
    type: Schema.Types.Number,
  },
  answeredAt: {
    type: Schema.Types.Date,
  },
  previousAnswer: {
    type: Schema.Types.Number,
  },
  questionId: {
    required: true,
    type: Schema.Types.Number,
  },
  startedAt: {
    required: true,
    type: Schema.Types.Date,
  },
});

export const sessionSchema = new Schema<SessionType, SessionModel>(
  {
    questions: [questionSchema],
    questionsAnswered: {
      default: 0,
      required: true,
      type: Schema.Types.Number,
    },
    seed: {
      default: randomInt(1000, 9999),
      required: true,
      type: Schema.Types.Number,
    },
    userEmail: {
      required: true,
      type: Schema.Types.String,
    },
  },
  {
    methods: {},
    statics: {},
    timestamps: {
      createdAt: 'timestamps.createdAt',
      updatedAt: 'timestamps.updatedAt',
    },
  },
);

export interface SessionDocument extends SessionType, Document {
  answerQuestion(this: SessionDocument, answer: number): Promise<SessionDocument>;
  setNewQuestion(this: SessionDocument): Promise<SessionDocument>;
}

const methods: Omit<SessionDocument, keyof SessionType | keyof Document> = {
  async answerQuestion(answer) {
    const question = this.questions[this.questionsAnswered];

    if (!question) {
      throw new Error('No question to answer');
    }

    question.answer = answer;
    question.answeredAt = new Date();
    question.previousAnswer = question.answer;

    this.questionsAnswered += 1;

    if (this.questionsAnswered < questionsPerSession) {
      await this.save();
      return this.setNewQuestion();
    }

    return this.save();
  },
  async setNewQuestion() {
    const answeredQuestions = await getSessionModel().availableQuestions(this.userEmail);

    const nextQuestionId = answeredQuestions[randomInt(0, answeredQuestions.length)];

    if (!this.questions) {
      this.questions = [];
    }

    this.questions.push({
      questionId: nextQuestionId,
      startedAt: new Date(),
    });

    return this.save();
  },
};

export interface SessionModel extends Model<SessionDocument> {
  availableQuestions(this: SessionModel, userEmail: string): Promise<number[]>;
  getSession(this: SessionModel, userEmail: string, preventCreateNewSession: true): Promise<SessionDocument | null>;
  getSession(this: SessionModel, userEmail: string, preventCreateNewSession?: false): Promise<SessionDocument>;
}

const statics: Omit<SessionModel, keyof Model<SessionDocument>> = {
  async availableQuestions(userEmail) {
    const answeredQuestions = await this.aggregate([
      { $match: { userEmail } },
      { $unwind: '$questions' },
      { $group: { _id: '$questions.questionId' } },
    ]);

    const answeredQuestionsIds = new Set(answeredQuestions.map(({ _id }) => parseInt(_id)));

    if (answeredQuestionsIds.size === 0 || answeredQuestionsIds.size >= questions.length - questionsPerSession) {
      return Array.from({ length: questions.length }, (_, i) => i);
    }

    return Array.from({ length: questions.length }, (_, i) => i).filter((id) => !answeredQuestionsIds.has(id));
  },
  async getSession(userEmail, preventCreateNewSession) {
    const isActiveSession = await this.findOne({ questionsAnswered: { $lt: questionsPerSession }, userEmail });

    if (isActiveSession) {
      return isActiveSession;
    }

    if (preventCreateNewSession) {
      return null as unknown as SessionDocument;
    }

    const newSession = new this({ userEmail });

    return newSession.setNewQuestion();
  },
};

sessionSchema.methods = methods;
sessionSchema.statics = statics;

export default function getSessionModel(): SessionModel {
  if (Reflect.has(models, 'Session')) {
    return Reflect.get(models, 'Session') as SessionModel;
  }

  return model<SessionType, SessionModel>('Session', sessionSchema);
}
