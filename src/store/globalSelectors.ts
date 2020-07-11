import { State } from "./createStore";
import { createSelector } from "@reduxjs/toolkit";

export const globalRootStateSelector = (state: State) => state.global;

export const languageSelector = createSelector(
  globalRootStateSelector,
  ({ locale }) => locale,
);
