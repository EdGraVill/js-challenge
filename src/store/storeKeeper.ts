import { Middleware } from "@reduxjs/toolkit"
import { State } from './createStore';
import { globalInitialState } from "./globalSlicer";
import { questionsInitialState } from "../Question";

const STORAGE_KEY = 'storeKeeper';

export const storeKeeper = (): [State, Middleware] => {
  let stored: State;
  
  try {
    stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch (error) {
    stored = {
      global: globalInitialState,
      questions: questionsInitialState,
    };
  }

  if (process.env.NODE_ENV === 'production') {
    stored.questions = questionsInitialState;
  }

  const middleware: Middleware = store => next => action => {
    const result = next(action);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()));

    return result;
  }

  return [stored, middleware];
}
