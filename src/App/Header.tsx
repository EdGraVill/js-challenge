import * as React from 'react';
import styled, { css } from 'styled-components';
import Title from '../UI/Title';

const Container = styled.div`
  ${({ theme: { colors } }: { theme: Theme }) => css`
    align-items: center;
    background-color: ${colors.background};
    box-sizing: border-box;
    display: flex;
    flex-flow: row nowrap;
    height: 6rem;
    justify-content: space-between;
    padding: 0 5vw;
  `}
`;

const Header = () => {
  return (
    <Container>
      <div />
      <Title>JS Challenge</Title>
      <div />
    </Container>
  );
};

export default Header;
