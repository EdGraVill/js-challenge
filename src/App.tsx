import React from 'react';
import { Questions } from './Question';
import { useSelector } from 'react-redux';
import { getTheme } from './store';
import { ThemeProvider } from 'styled-components';

function App() {
  const theme = useSelector(getTheme);

  return (
    <ThemeProvider theme={theme}>
      <Questions />
    </ThemeProvider>
  );
}

export default App;
