import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getGlobalInitialState, globalActions, themeSelector } from '../store';

const Container = styled.div`
  border: 1px solid black;
  display: flex;
  flex-flow: column nowrap;
`;

const SwitchTheme: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector(themeSelector);

  const onSwitchTheme = React.useCallback(() => dispatch(globalActions.switchTheme()), [dispatch]);

  return (
    <Container>
      <div>Default theme: {getGlobalInitialState().theme}</div>
      <div>Current theme: {theme}</div>
      <div>
        Action: <button onClick={onSwitchTheme}>Switch Theme</button>
      </div>
    </Container>
  );
};

export default SwitchTheme;
