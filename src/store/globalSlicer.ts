import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const globalInitialState = {
  locale: "en-US",
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
  },
});
