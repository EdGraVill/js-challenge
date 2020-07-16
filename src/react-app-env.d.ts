/// <reference types="react-scripts" />
import "styled-components";

declare interface PromiseConstructor {
  allSettled(promises: Array<Promise<any>>): Promise<Array<{status: 'fulfilled' | 'rejected', value?: any, reason?: any}>>;
}

declare module "questions.json" {
  let content: Content[];
  export default content;
}

declare module "styled-components" {
  type ThemeDictionary = import("./theme").ThemeDictionary;

  export interface DefaultTheme extends ThemeDictionary {
  }
}
