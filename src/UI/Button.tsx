import * as React from 'react';
import styled, { css } from 'styled-components';

const Base = styled.button`
  ${({ theme: { colors, fonts } }: { theme: Theme }) => css`
    background-color: ${colors.transparent};
    border: 1px solid ${colors.primary};
    border-radius: 5px;
    color: ${colors.primary};
    cursor: pointer;
    font-family: ${fonts.titles};
    font-size: 1.2rem;
    font-weight: bold;
    padding: .5rem 1rem;
    line-height: 1.7rem;
    margin: .5rem 1rem;
    user-select: none;
    width: 100%;

    & > p {
      margin: 0;
      padding: 0;
    }

    & code {
      background-color: #FFFFFF20;
      font-family: ${fonts.code};
      padding: .3rem .5rem;
    }

    &:focus {
      outline: none;
    }

    &:hover {
      background-color: ${`${colors.primary}15`};
    }

    &:disabled {
      background-color: ${`${colors.disabled}15`};
      border: 1px solid ${colors.disabled};
      color: ${colors.disabled};
      cursor: default;
    }
  `}
`;

const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <Base {...props} />
);

export default Button;
