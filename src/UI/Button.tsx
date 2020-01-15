import * as React from 'react';
import styled from 'styled-components';

const Base = styled.button`
  background-color: transparent;
  border: 1px solid #6264a7;
  border-radius: 5px;
  color: #6264a7;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    padding: .3rem .5rem;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #6264a715;
  }

  &:disabled {
    background-color: #CCCCCC15;
    border: 1px solid #CCC;
    color: #CCC;
    cursor: default;
  }
`;

const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <Base {...props} />;
};

export default Button;
