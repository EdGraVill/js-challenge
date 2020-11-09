import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDefaultTheme } from '../util';
import content from '../questions.json';

export const getGlobalInitialState = () => ({
  locale: 'en-EN',
  theme: getDefaultTheme(),
});

export type GlobalState = ReturnType<typeof getGlobalInitialState>;

export const { actions: globalActions, reducer: globalReducer, name: globalReducerName } = createSlice({
  initialState: getGlobalInitialState(),
  name: 'global',
  reducers: {
    restoreInitialState() {
      return getGlobalInitialState();
    },
    setLocale(state, { payload }: PayloadAction<string>) {
      const availableLocales = content.map(({ locale }) => locale);

      if (availableLocales.includes(payload)) {
        state.locale = payload;
      } else {
        state.locale = getGlobalInitialState().locale;
      }
    },
    switchTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
  },
});
