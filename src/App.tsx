import React from 'react';
import { useSelector } from 'react-redux';
import { getTheme, isRTLSelector } from './store';
import { ThemeProvider } from 'styled-components';
import { Challenge } from './Challenge';
import { GlobalStyle } from './UI';
import Devtool from './Devtool';

function App() {
  const theme = useSelector(getTheme);
  const isRTL = useSelector(isRTLSelector);

  return (
    <ThemeProvider theme={theme}>
      <Devtool />
      <GlobalStyle isRTL={isRTL} />
      <Challenge />
    </ThemeProvider>
  );
}

export default App;
