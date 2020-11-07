import * as React from 'react';
import styled from 'styled-components';
import LocalePicker from './LocalePicker';
import SwitchTheme from './SwitchTheme';

const Bar = styled.div`
  align-items: center;
  background-color: white;
  border: 1px solid black;
  color: black !important;
  direction: ltr;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  min-height: 64px;
  width: 100vw;

  * {
    color: black !important;
    direction: ltr;
  }
`;

const Toolbar: React.FC = () => {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <Bar>
      <SwitchTheme />
      <LocalePicker />
    </Bar>
  );
};

export default Toolbar;
