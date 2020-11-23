import { Middleware } from '@reduxjs/toolkit';
import { getQuestionsInitialState, questionsReducerName } from '../QuestionsEngine';
import { State } from './createStore';
import { getGlobalInitialState, globalReducerName } from './globalSlicer';

const STORAGE_KEY = 'storeKeeper';

export const storeKeeper = (): [State, Middleware] => {
  let stored: State;

  try {
    stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch (error) {
    stored = {
      [globalReducerName]: getGlobalInitialState(),
      [questionsReducerName]: getQuestionsInitialState(),
    };
  }

  // if (process.env.NODE_ENV === 'production') {
  //   stored.questions = questionsInitialState;
  // }

  const middleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()));

    return result;
  };

  return [stored, middleware];
};
