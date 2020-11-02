import { createGlobalStyle, css } from "styled-components";

export default createGlobalStyle`
  ${({ theme: { colors, fonts } }) => css`
    * {
      color: ${colors.text};
      box-sizing: border-box;
      font-family: ${fonts.common};
    }

    body, html {
      background-color: ${colors.background};
      margin: 0;
      padding: 0;
    }
  `}
`;
