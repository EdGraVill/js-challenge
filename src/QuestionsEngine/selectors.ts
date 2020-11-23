import { createSelector } from '@reduxjs/toolkit';
import { State } from '../store';
import content from '../questions.json';
import { Result } from './slicer';

export const questionsRootStateSelector = (state: State) => state.questions;

export const sessionDetailsSelector = createSelector(
  questionsRootStateSelector,
  ({ sessionDetails }) => sessionDetails,
);

export const sessionNameSelector = createSelector(sessionDetailsSelector, ({ name }) => name);

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
    if (!questionsId.length || questionIx === 10) {
      return {
        options: [],
        question: '',
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const questions = content.find((set) => set.locale === locale)!;
    const questionId = questionsId[questionIx];

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
    };
  },
);

export const isWelcomeScreenSelector = createSelector(
  questionsRootStateSelector,
  ({ questionsId, sessionDetails: { isActive } }) => !isActive && !questionsId.length,
);

export const isResultsScreenSelector = createSelector(
  questionsRootStateSelector,
  ({ questionIx }) => questionIx === 10,
);

export const isActiveSelector = createSelector(
  questionsRootStateSelector,
  ({ sessionDetails: { isActive } }) => isActive,
);

export const startTimeSelector = createSelector(questionsRootStateSelector, ({ currentStart }) => currentStart);

export const canGoNextSelector = createSelector(
  questionsRootStateSelector,
  ({ questionIx, results }) => questionIx < results.length,
);

export const canGoPrevSelector = createSelector(questionsRootStateSelector, ({ questionIx }) => questionIx > 0);

export const isDetailsPageSelector = createSelector(questionsRootStateSelector, ({ questionIx }) => questionIx === 10);

export const resultsSelector = createSelector(questionsRootStateSelector, ({ results }) => results);

export const currentQuestionSelector = createSelector(questionsRootStateSelector, ({ questionIx }) => questionIx);

export const isNextQuestionEmptySelector = createSelector(
  questionsRootStateSelector,
  ({ questionIx, results }) => !results[questionIx + 1],
);

export const isLastQuestionSelector = createSelector(questionsRootStateSelector, ({ questionIx }) => questionIx === 9);

export const historySelector = createSelector(questionsRootStateSelector, ({ history, sessionDetails }) =>
  history.filter(({ sessionDetails: { name } }) => name === sessionDetails.name),
);
