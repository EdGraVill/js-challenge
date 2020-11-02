import React from 'react';
import { useSelector } from 'react-redux';
import { getTheme } from './store';
import { ThemeProvider } from 'styled-components';
import { Challenge } from './Challenge';
import { GlobalStyle } from './UI';

function App() {
  const theme = useSelector(getTheme);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Challenge />
    </ThemeProvider>
  );
}

export default App;
