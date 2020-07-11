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

  const submitFunctions: Array<(answer: number) => Promise<AnswerResponse>> = [api.submitAnswer];

  function* nextQuestionEffect({ payload }: PayloadAction<number>): any {
    const answeredCount = yield select(answeredCountSelector);

    const { api: nexApi, myAnswer, rightAnswer }: AnswerResponse = yield call(
      submitFunctions[answeredCount],
      payload,
    );

    submitFunctions.push(nexApi.submitAnswer);

    yield put(questionsActions.getAnswer({
      currentQuestion: nexApi.currentQuestion,
      myAnswer,
      rightAnswer,
    }));
  }

  yield takeLatest(questionsActions.submitAnswer.type, nextQuestionEffect);
}

export function* questionsRootSagas() {
  yield takeLatest(questionsActions.requestFirstQuestion.type, getFirstQuestionEffect);
}
