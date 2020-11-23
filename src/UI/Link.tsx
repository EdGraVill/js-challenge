import styled, { css } from 'styled-components';

const Link = styled.a`
  ${({ theme: { colors } }) => css`
    color: ${colors.text};
    font-size: 1.2rem;
    text-decoration: underline;
  `}
`;

export default Link;
