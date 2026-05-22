import { Language } from '@/globalTypes';
import { shuffle } from '@/util';
import { isEmail } from '@/util/validators';
import questions from '@content/questions.json';
import { randomUUID } from 'crypto';
import addMinutes from 'date-fns/addMinutes';
import type { Document, Model } from 'mongoose';
import { Schema, model, models } from 'mongoose';

import getSessionModel from './Session';

export interface UserType {
  email: string;
  isActive: boolean;
  name: string;
  preferredLanguage: keyof typeof Language;
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };
  verificationCode?: string;
  verificationCodeCreatedAt?: Date;
}

export const userSchema = new Schema<UserType, UserModel>(
  {
    email: {
      index: true,
      required: true,
      type: Schema.Types.String,
      unique: true,
      validate: {
        message: (props: { value: string }) => `${props.value} is not a valid email!`,
        validator: isEmail,
      },
    },
    isActive: {
      default: false,
      type: Schema.Types.Boolean,
    },
    name: {
      required: true,
      type: Schema.Types.String,
    },
    preferredLanguage: {
      default: 'en-EN',
      enum: Object.keys(Language),
      required: true,
      type: Schema.Types.String,
    },
    verificationCode: {
      default: randomUUID,
      type: Schema.Types.UUID,
    },
    verificationCodeCreatedAt: {
      default: new Date(),
      type: Schema.Types.Date,
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

interface Stat {
  correctAnswers: number;
  timeInSeconds: number;
}

export interface UserDocument extends UserType, Document {
  activateOrDelete(this: UserDocument, verificationCode: string): Promise<UserDocument>;
  checkVerificationCode(this: UserDocument, verificationCode: string): Promise<UserDocument>;
  requestVerificationCode(this: UserDocument): Promise<UserDocument>;
  stats(this: UserDocument, limit?: number): Promise<Stat[]>;
}

const methods: Omit<UserDocument, keyof UserType | keyof Document> = {
  async activateOrDelete(verificationCode) {
    if (!this.isActive && addMinutes(this.timestamps.createdAt, 15) > new Date()) {
      await this.deleteOne();

      throw new Error('New account validation time expired');
    }

    if (!this.isActive && verificationCode !== this.verificationCode) {
      throw new Error('Verification code does not match');
    }

    this.isActive = true;
    this.verificationCode = undefined;
    this.verificationCodeCreatedAt = undefined;

    return this.save();
  },
  async checkVerificationCode(verificationCode) {
    if (!this.isActive) {
      return this.activateOrDelete(verificationCode);
    }

    if (!this.verificationCode || !this.verificationCodeCreatedAt) {
      this.verificationCode = undefined;
      this.verificationCodeCreatedAt = undefined;

      await this.save();

      throw new Error('No verification code active');
    }

    if (addMinutes(this.verificationCodeCreatedAt, 15) < new Date()) {
      this.verificationCode = undefined;
      this.verificationCodeCreatedAt = undefined;

      await this.save();

      throw new Error('Verification code expired');
    }

    if (verificationCode !== this.verificationCode) {
      throw new Error('Verification code does not match');
    }

    this.verificationCode = undefined;
    this.verificationCodeCreatedAt = undefined;

    return this.save();
  },
  requestVerificationCode() {
    this.verificationCode = randomUUID();
    this.verificationCodeCreatedAt = new Date();

    return this.save();
  },
  async stats(limit = 30) {
    const sessions = await getSessionModel()
      .find({ questionsAnswered: Number(process.env.QUESTIONS_PER_SESSION ?? 3), userEmail: this.email })
      .sort({ 'timestamps.createdAt': -1 })
      .limit(limit)
      .lean()
      .exec();

    return sessions.map(
      (session): Stat => ({
        correctAnswers: session.questions.filter((sessionQuestion) => {
          const question = questions.find(({ id }) => id === sessionQuestion.questionId);

          if (!question) return false;

          return (
            sessionQuestion.answer ===
            shuffle(
              Array.from({ length: question.options['en-EN'].length }, (_, i) => i),
              session.seed,
            ).indexOf(question.answer)
          );
        }).length,
        timeInSeconds:
          session.questions.reduce(
            (acc, { startedAt, answeredAt }) => acc + (answeredAt?.getTime() ?? 0) - startedAt.getTime(),
            0,
          ) / 1000,
      }),
    );
  },
};

export interface UserModel extends Model<UserDocument> {
  requestSignIn(this: UserModel, email: string): Promise<UserDocument>;
  signUp(this: UserModel, email: string, name: string, preferredLanguage: keyof typeof Language): Promise<UserDocument>;
  verify(this: UserModel, email: string, verificationCode: string): Promise<UserDocument>;
}

const statics: Omit<UserModel, keyof Model<UserDocument>> = {
  async requestSignIn(email) {
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error('Account does not exist');
    }

    if (!user.isActive) {
      throw new Error('Account is not active');
    }

    return user.requestVerificationCode();
  },
  async signUp(email, name, preferredLanguage) {
    const user = await this.findOne({ email });

    if (user) {
      throw new Error('Account already exists');
    }

    const newUser = new this({
      email,
      name,
      preferredLanguage,
    });

    return newUser.save();
  },
  async verify(email, verificationCode) {
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error('Account does not exist');
    }

    return user.checkVerificationCode(verificationCode);
  },
};

userSchema.methods = methods;
userSchema.statics = statics;

export default function getUserModel(): UserModel {
  if (Reflect.has(models, 'User')) {
    return Reflect.get(models, 'User') as UserModel;
  }

  return model<UserType, UserModel>('User', userSchema);
}
