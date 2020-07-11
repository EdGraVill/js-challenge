/// <reference types="react-scripts" />

declare interface PromiseConstructor {
  allSettled(promises: Array<Promise<any>>): Promise<Array<{status: 'fulfilled' | 'rejected', value?: any, reason?: any}>>;
}

declare module "questions.json" {
  let content: Content[];
  export default content;
}
