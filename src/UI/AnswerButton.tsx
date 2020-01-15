import * as React from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button<{ tint?: string }>`
  ${({ tint }) => css`
    background-color: ${tint || '#6264a7'};
    border: 0;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
      font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
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

const AnswerButton: React.FC<AnswerButtonProps> = ({ selected, isCorrect, ...props }) => {
  const color = isCorrect ? '#008272' : selected ? '#a4373a' : undefined;

  return <Button {...props} tint={color} />;
};

export default AnswerButton;
