export interface ThemeDictionary {
  colors: {
    background: string;
    buttonActiveBackground: string;
    buttonActiveColor: string;
    buttonBackground: string;
    buttonBorder: string;
    buttonColor: string;
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

export const themeObject: { [theme: string]: ThemeDictionary } = {
  light: {
    ...commonTheme,
    colors: {
      background: 'white',
      buttonActiveBackground: '#21252b',
      buttonActiveColor: 'white',
      buttonBackground: 'transparent',
      buttonBorder: '#21252b',
      buttonColor: '#21252b',
      codeBackground: '#282c34',
      codeSelected: '#677696',
      inlineCodeBackground: '#DDDDDD',
      inlineCodeColor: '#282c34',
      text: '#21252b',
    },
  },
  dark: {
    ...commonTheme,
    colors: {
      background: '#21252b',
      buttonActiveBackground: '#bdc3c7',
      buttonActiveColor: 'black',
      buttonBackground: 'transparent',
      buttonBorder: '#bdc3c7',
      buttonColor: '#bdc3c7',
      codeBackground: '#282c34',
      codeSelected: '#677696',
      inlineCodeBackground: '#CCC',
      inlineCodeColor: '#282c34',
      text: '#bdc3c7',
    },
  },
};
