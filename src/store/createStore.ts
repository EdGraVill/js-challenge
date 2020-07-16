import {
  configureStore,
  combineReducers,
  StateFromReducersMapObject,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { globalReducer } from "./globalSlicer";
import { questionsRootSagas, questionsReducer } from "../Question";
import { storeKeeper } from "./storeKeeper";

export const reducersMap = {
  global: globalReducer,
  questions: questionsReducer,
};

export type State = StateFromReducersMapObject<typeof reducersMap>;

export const createStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const [restoredState, skMiddleware] = storeKeeper();

  const store = configureStore({
    reducer: combineReducers(reducersMap),
    devTools: process.env.NODE_ENV !== "production",
    middleware: [...getDefaultMiddleware(), sagaMiddleware, skMiddleware],
    preloadedState: restoredState,
  });

  sagaMiddleware.run(questionsRootSagas);

  return store;
};
