import { css } from "styled-components";

export default css`
  ${({ theme: { colors, fonts } }) => css`
      background-color: ${colors.inlineCodeBackground};
      border-radius: .2rem;
      color: ${colors.inlineCodeColor};
      font-family: ${fonts.code};
      font-size: 80%;
      font-weight: bold;
      padding: .3rem .5rem;
      white-space: nowrap;
  `}
`;
