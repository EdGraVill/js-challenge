import { State } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import { Answered } from "./slicer";
import { getStoredAnswers } from "../antiCheatSystem";

export const questionsRootStateSelector = (state: State) => state.questions;

export const isQuestionsLoading = createSelector(
  questionsRootStateSelector,
  ({ isLoading }) => isLoading,
);

export const answeredCountSelector = createSelector(
  questionsRootStateSelector,
  ({ answered }) => answered.length,
);

export const selectedQuestionSelector = createSelector(
  questionsRootStateSelector,
  ({ answered, currentQuestion, lastQuestion }) => {
    if (answered.length === currentQuestion) {
      return lastQuestion!;
    }

    return answered[currentQuestion];
  }
);

export const selectedQuestionHistory = createSelector(
  selectedQuestionSelector,
  (question) => {
    if (typeof question.question === 'string') {
      return [];
    } else {
      const { myAnswer: { id, locale } } = question as Answered;

      const answers = getStoredAnswers(locale);

      return answers.filter(answer => answer.id === id);
    }
  }
)
