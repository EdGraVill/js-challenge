export interface ThemeDictionary {
  colors: {
    background: string;
    buttonBackground: string;
    buttonColor: string;
    buttonDisabledBackground: string;
    codeBackground: string;
    codeSelected: string;
    inlineCodeBackground: string;
    inlineCodeColor: string;
    optionActiveColor: string;
    optionBackground: string;
    optionRight: string;
    optionWrong: string;
    text: string;
  };
  fonts: {
    code: string;
    common: string;
  };
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
      buttonBackground: '#0089fa',
      buttonColor: '#f9f9f9',
      buttonDisabledBackground: '#4e5860',
      codeBackground: '#282c34',
      codeSelected: '#677696',
      inlineCodeBackground: '#DDDDDD',
      inlineCodeColor: '#ea7659',
      optionActiveColor: '#f8b500',
      optionBackground: '#5c636e',
      optionRight: '#a1c45a',
      optionWrong: '#fd0054',
      text: '#21252b',
    },
  } as ThemeDictionary,
  dark: {
    ...commonTheme,
    colors: {
      background: '#21252b',
      buttonBackground: '#3282b8',
      buttonColor: '#f9f9f9',
      buttonDisabledBackground: '#6b778d',
      codeBackground: '#282c34',
      codeSelected: '#677696',
      inlineCodeBackground: '#393e46',
      inlineCodeColor: '#f8b500',
      optionActiveColor: '#ea7659',
      optionBackground: '#5c636e',
      optionRight: '#a1c45a',
      optionWrong: '#e36161',
      text: '#bdc3c7',
    },
  } as ThemeDictionary,
};
