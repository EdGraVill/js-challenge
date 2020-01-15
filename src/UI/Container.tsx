import * as React from 'react';
import styled from 'styled-components';

const Base = styled.main``;

const Container: React.FC = ({ children }) => {
  return <Base>{children}</Base>;
};

export default Container;
