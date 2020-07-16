import { createSelector } from "@reduxjs/toolkit";
import { State } from "./createStore";
import { themeObject } from '../theme';

export const globalRootStateSelector = (state: State) => state.global;

export const languageSelector = createSelector(
  globalRootStateSelector,
  ({ locale }) => locale,
);

export const themeSelector = createSelector(
  globalRootStateSelector,
  ({ theme }) => theme,
);

export const getTheme = createSelector(
  themeSelector,
  theme => themeObject[theme],
);
