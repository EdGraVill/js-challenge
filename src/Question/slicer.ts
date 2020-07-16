import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Question, SafeQuestion, StoredAnswer } from "../types";

export interface Answered {
  question: Question;
  myAnswer: StoredAnswer;
}

export const questionsInitialState = {
  answered: [] as Answered[],
  currentQuestion: 0,
  isLoading: false,
  lastQuestion: null as SafeQuestion | null,
};

export type QuestionsState = typeof questionsInitialState;

export const { actions: questionsActions, reducer: questionsReducer } = createSlice({
  initialState: questionsInitialState,
  name: 'questions',
  reducers: {
    restoreInitialState() {
      return questionsInitialState;
    },
    requestFirstQuestion(state) {
      state.isLoading = true;
    },
    getFirstQuestion(state, { payload }: PayloadAction<SafeQuestion>) {
      state.isLoading = false;

      state.lastQuestion = payload;
    },
    submitAnswer(state, action: PayloadAction<number>) {
      state.isLoading = true;
    },
    getAnswer(
      state,
      { payload: { currentQuestion, myAnswer, rightAnswer }}: PayloadAction<{
        currentQuestion: SafeQuestion;
        myAnswer: StoredAnswer;
        rightAnswer: Question;
      }>,
    ) {
      state.isLoading = false;

      state.answered.push({
        myAnswer,
        question: rightAnswer,
      });

      state.lastQuestion = currentQuestion;
    },
    nextQuestion(state) {
      if (state.currentQuestion < state.answered.length) {
        state.currentQuestion += 1;
      }
    },
    previousQuestion(state) {
      if (state.currentQuestion > 0) {
        state.currentQuestion -= 1;
      }
    },
    goToQuestion(state, { payload }: PayloadAction<number>) {
      if (payload >= 0 && payload <= state.answered.length) {
        state.currentQuestion = payload;
      } 
    },
  },
});
