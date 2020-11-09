import { createSelector } from "@reduxjs/toolkit";
import { State } from "../store";
import content from '../questions.json';
import { Result } from "./slicer";

export const questionsRootStateSelector = (state: State) => state.questions;

export const sessionDetailsSelector = createSelector(
  questionsRootStateSelector,
  ({ sessionDetails }) => sessionDetails,
);

export const sessionNameSelector = createSelector(
  sessionDetailsSelector,
  ({ name }) => name,
);

export interface Question {
  code?: string;
  codeLanguage?: string;
  explanation?: string;
  options: string[];
  question: string;
  result?: Result;
}

export const questionSelector = createSelector(
  questionsRootStateSelector,
  ({ questionIx, questionsId, results, sessionDetails: { locale } }): Question => {
    if (!questionsId.length) {
      return {
        options: [],
        question: '',
      };
    }

    const questions = content.find((set) => set.locale === locale)!;
    const questionId = questionsId[questionIx];

    const { explanation, options, question, code, codeLanguage } = questions.list.find(({ id }) => id === questionId)!;


    if (results[questionIx]) {
      return {
        code,
        codeLanguage,
        explanation,
        options,
        question,
        result: results[questionIx],
      };
    }

    return {
      code,
      codeLanguage,
      options,
      question,
    }
  },
);

export const isWelcomeScreenSelector = createSelector(
  questionsRootStateSelector,
  ({ questionsId, sessionDetails: { isActive } }) => !isActive && !questionsId.length,
)

export const isActiveSelector = createSelector(
  questionsRootStateSelector,
  ({ sessionDetails: { isActive } }) => isActive,
);

export const startTimeSelector = createSelector(
  questionsRootStateSelector,
  ({ currentStart }) => currentStart,
);
