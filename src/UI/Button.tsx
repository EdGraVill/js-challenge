import styled, { css } from 'styled-components';

const Button = styled.button`
  ${({ theme: { colors } }) => css`
    background-color: ${colors.buttonBackground};
    border: 0;
    border-radius: 0.5rem;
    color: ${colors.buttonColor};
    cursor: pointer;
    font-size: 1.1rem;
    letter-spacing: 0.05rem;
    padding: 0.5rem 0.75rem;

    &:disabled {
      background-color: ${colors.buttonDisabledBackground};
      cursor: not-allowed;
    }

    &:focus {
      outline: none;
    }
  `}
`;

export default Button;
