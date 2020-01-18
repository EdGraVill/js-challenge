import * as React from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button`
  ${({ isCorrect, selected, theme: { colors, fonts } }: { isCorrect: boolean, selected: boolean, theme: Theme }) => css`
    background-color: ${isCorrect ? colors.right : selected ? colors.wrong : colors.primary};
    border: 0;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-family: ${fonts.titles};
    font-size: 1.2rem;
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
      filter: brightness(1.15);
    }
  `}
`;

interface AnswerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean;
  isCorrect: boolean;
}

const AnswerButton: React.FC<AnswerButtonProps> = ({ selected, isCorrect, ...props }) => (
  <Button {...props} isCorrect={isCorrect} selected={selected} />
);

export default AnswerButton;
