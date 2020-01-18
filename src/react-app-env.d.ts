/// <reference types="react-scripts" />

interface Question {
  answer: number;
  explanation: string[];
  id: number;
  options: string[];
  problem: string;
  question: string;
}

interface SecureQuestion {
  getAnswer: (selection: number) => {
    rightAnswer: number;
    explanation: string[];
  };
  id: number;
  options: string[];
  problem: string;
  question: string;
}

type Answer = [number, number | null, boolean | null];

interface Setlanguage {
  setting: 'language';
  value: string;
}

interface SetTheme {
  setting: 'theme';
  value: keyof (typeof import('./util').themes);
}

type SetSetting = (changeRequest: Setlanguage | SetTheme) => void;

interface Settings {
  language: string;
  theme: keyof (typeof import('./util').themes);
  setSetting: SetSetting;
}

interface Theme {
  colors: {
    primary: string;
    primaryDark: string;
    right: string;
    wrong: string;
    transparent: string;
    gray: string;
    codeBackground: string;
    codeSelected: string;
    inlineCodeBackground: string;
    inlineCodeColor: string;
    background: string;
    disabled: string;
  };
  fonts: {
    code: string;
    titles: string;
  };
}

interface ThemeWithProps<P> extends P {
  theme: Theme;
};

interface TranslationInfo {
  name: string;
  locale: string;
}
