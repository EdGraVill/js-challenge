import * as React from 'react';
import styled, { css } from 'styled-components';

const Heading = styled.h1`
  ${({ theme: { fonts } }: { theme: Theme }) => css`
    font-family: ${fonts.titles};
    font-size: 2rem;
    margin: 0;
  `}
`;

const Title: React.FC = () => {
  return <Heading>JS Challenge</Heading>;
};

export default Title;
