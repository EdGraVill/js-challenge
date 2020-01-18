import * as React from 'react';
import { getAnswers } from './App/getQuestions';
import { ThemeProvider } from 'styled-components';

export const randomBetween = (min: number, max: number, ignore?: number | number[]): number => {
  let random = Math.floor(Math.random() * (max - min + 1) + min);

  if (typeof ignore === 'undefined' || (ignore instanceof Array && !ignore.length)) {
    return random;
  } else if (typeof ignore === 'number') {
    while (random === ignore) {
      random = Math.floor(Math.random() * (max - min + 1) + min);
    }

    return random;
  } else if (ignore instanceof Array && typeof ignore[0] === 'number') {
    while (ignore.indexOf(random) !== -1) {
      random = Math.floor(Math.random() * (max - min + 1) + min);
    }

    return random;
  }

  throw new Error(`Invalid operation:\n\n${JSON.stringify({ min, max, ignore }, undefined, 2)}`);
};

export const checkAnswersIntegrity = (safeAnswers: Answer[]): boolean =>
  !getAnswers().length || JSON.stringify(safeAnswers) !== JSON.stringify(getAnswers());

export const themes = {
  light: {
    colors: {
      primary: '#6264a7',
      primaryDark: '#4E5085',
      right: '#008272',
      wrong: '#a4373a',
      transparent: 'transparent',
      gray: '#777777',
      codeBackground: '#282c34',
      codeSelected: '#677696',
      inlineCodeBackground: '#DDDDDD',
      inlineCodeColor: '#282c34',
      background: '#ecf0f1',
      disabled: '#CCCCCC'
    },
    fonts: {
      code: `Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace`,
      titles: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`,
    },
  },
};

// Testing React context and a way to make it fit, Maybe I will replace it with redux

export const defaultSettings: Settings = {
  language: localStorage.getItem('language') || 'en-US',
  theme: 'light',
  setSetting: () => {},
};

export const SettingsContext = React.createContext<Settings>(defaultSettings);

export const SettingsProvider: React.FC = ({ children }) => {
  const [settings, setSettingsRaw] = React.useState<Settings>(defaultSettings);

  const setSetting: SetSetting = ({ setting, value }) => {
    const newState = { ...settings, [setting]: value };

    if (setting === 'language') {
      localStorage.setItem('language', value);
    }

    setSettingsRaw(newState);
  };

  return (
    <SettingsContext.Provider value={{ ...settings, setSetting }}>
      <ThemeProvider theme={themes[settings.theme]}>
        {children}
      </ThemeProvider>
    </SettingsContext.Provider>
  );
}
