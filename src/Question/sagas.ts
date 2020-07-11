import { takeLatest, select, call, put } from 'redux-saga/effects';
import { questionsActions } from './slicer';
import { PayloadAction } from '@reduxjs/toolkit';
import { languageSelector } from '../store';
import { loadQuestions, QuestionsAPI, AnswerResponse } from './loadQuestions';
import { answeredCountSelector } from './selectors';

export function* getFirstQuestionEffect() {
  const locale = yield select(languageSelector);

  const api: QuestionsAPI = yield call(loadQuestions, locale);

  yield put(questionsActions.getFirstQuestion(api.currentQuestion));

  const createNextQuestionEffect = (
    submitFunction: (answer: number) => Promise<AnswerResponse>,
    n: number,
  ) => function* nextQuestionEffect({ payload }: PayloadAction<number>): any {
    const answeredCount = yield select(answeredCountSelector);

    if (n === answeredCount) {
      const { api: nexApi, myAnswer, rightAnswer }: AnswerResponse = yield call(submitFunction, payload);
  
      yield put(questionsActions.getAnswer({
        currentQuestion: nexApi.currentQuestion,
        myAnswer,
        rightAnswer,
      }));
  
      yield takeLatest(questionsActions.submitAnswer.type, createNextQuestionEffect(nexApi.submitAnswer, n + 1));
    }
  }

  yield takeLatest(questionsActions.submitAnswer.type, createNextQuestionEffect(api.submitAnswer, 0));
}

export function* questionsRootSagas() {
  yield takeLatest(questionsActions.requestFirstQuestion.type, getFirstQuestionEffect);
}
