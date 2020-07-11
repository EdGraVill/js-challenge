export interface StoredAnswer {
  answer: number;
  date: number;
  hash: string;
  id: number;
  locale: string;
  rightAnswer: number;
  time: number;
}

export interface Question {
  answer: number;
  code?: string;
  explanation: string;
  id: number;
  options: string[];
  question: string;
}

export type SafeQuestion = Omit<Question, 'answer' | 'explanation'>;

export interface Content {
  isRTL: boolean;
  language: string;
  list: Question[];
}
