import { createSelector } from '@reduxjs/toolkit';
import { State } from './createStore';
import { themeObject } from '../theme';
import content from '../questions.json';

export const globalRootStateSelector = (state: State) => state.global;

export const localeSelector = createSelector(globalRootStateSelector, ({ locale }) => locale);

export const isRTLSelector = createSelector(
  globalRootStateSelector,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  ({ locale }) => content.find((questions) => questions.locale === locale)!.isRTL,
);

export const themeSelector = createSelector(globalRootStateSelector, ({ theme }) => theme);

export const getTheme = createSelector(themeSelector, (theme) => themeObject[theme]);
