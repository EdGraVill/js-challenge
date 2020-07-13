import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDefaultTheme } from "../util";

export const globalInitialState = {
  locale: "en-US",
  theme: getDefaultTheme(),
};

export type GlobalState = typeof globalInitialState;

export const { actions: globalActions, reducer: globalReducer } = createSlice({
  initialState: globalInitialState,
  name: "global",
  reducers: {
    restoreInitialState() {
      return globalInitialState;
    },
    setLocale(state, { payload }: PayloadAction<string>) {
      state.locale = payload;
    },
    switchTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
  },
});
