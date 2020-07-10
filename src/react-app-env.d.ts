/// <reference types="react-scripts" />

declare interface PromiseConstructor {
  allSettled(promises: Array<Promise<any>>): Promise<Array<{status: 'fulfilled' | 'rejected', value?: any, reason?: any}>>;
}

declare module "questions.json" {
  export interface Question {
    answer: number;
    code?: string;
    explanation: string;
    id: number;
    options: string[];
    question: string;
  }
  
  export interface Content {
    isRTL: boolean;
    language: string;
    list: Question[];
  }

  let content: Content[];
  export default content;
}
