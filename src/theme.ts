export interface ThemeDictionary {
  colors: {
    background: string;
    buttonActiveColor: string;
    buttonBackground: string;
    buttonRight: string;
    buttonWrong: string;
    codeBackground: string;
    codeSelected: string;
    inlineCodeBackground: string;
    inlineCodeColor: string;
    text: string;
  };
  fonts: {
    code: string;
    common: string;
  },
}

const commonTheme = {
  fonts: {
    code: `'Cascadia Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace`,
    common: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`,
  },
};

export const themeObject = {
  light: {
    ...commonTheme,
    colors: {
      background: 'white',
      buttonActiveColor: '#f8b500',
      buttonBackground: '#5c636e',
      buttonRight: '#a1c45a',
      buttonWrong: '#fd0054',
      codeBackground: '#282c34',
      codeSelected: '#677696',
      inlineCodeBackground: '#DDDDDD',
      inlineCodeColor: '#ea7659',
      text: '#21252b',
    },
  } as ThemeDictionary,
  dark: {
    ...commonTheme,
    colors: {
      background: '#21252b',
      buttonActiveColor: '#ea7659',
      buttonBackground: '#5c636e',
      buttonRight: '#a1c45a',
      buttonWrong: '#e36161',
      codeBackground: '#282c34',
      codeSelected: '#677696',
      inlineCodeBackground: '#393e46',
      inlineCodeColor: '#f8b500',
      text: '#bdc3c7',
    },
  } as ThemeDictionary,
};
