import * as React from 'react';
import styled, { css } from 'styled-components';
import Prism from 'prismjs';
import purify from 'dompurify';
import prismTheme from './prismTheme';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem 0;
  overflow-x: auto;
  width: 100%;

  @media screen and (max-width: 600px) {
    justify-content: flex-start;
  }
`;

export const CodeContainer = styled.div`
  ${({ theme: { colors, fonts } }) => css`
    color: #e5c07b;
    font-family: ${fonts.code};
    white-space: pre-wrap;
    ${prismTheme}
    background-color: ${colors.codeBackground};
    border-radius: 1rem;
    box-sizing: border-box;
    direction: ltr;
    font-size: 0.9rem;
    padding: 1.25rem 2rem;
    line-height: 1.3rem;
    width: 600px;

    &::selection,
    & *::selection {
      background-color: ${`${colors.codeSelected}60`};
    }

    @media screen and (max-width: 600px) {
      border-radius: 0;
    }

    & * {
      color: #bdc3c7;
      direction: ltr;
      font-family: ${fonts.code};
    }
  `}
`;

interface Props {
  code: string;
  language?: string;
}

export default function CodeSnippet({ code, language = 'javascript' }: Props) {
  const parsedCode = Prism.highlight(code, Prism.languages[language], language);

  React.useEffect(() => {
    const listener = function (e: ClipboardEvent) {
      const text_only = document?.getSelection()?.toString();
      const clipdata = e.clipboardData;

      if (process.env.NODE_ENV === 'production' && text_only?.includes(code)) {
        clipdata?.setData('text/plain', "Don't be a cheater");
        clipdata?.setData('text/html', "Don't be a cheater");
      } else {
        clipdata?.setData('text/plain', text_only || '');
        clipdata?.setData('text/html', text_only || '');
      }

      e.preventDefault();
    };

    document.addEventListener('copy', listener);

    return () => {
      document.removeEventListener('copy', listener);
    };
  }, [code]);

  return (
    <Wrapper>
      <CodeContainer dangerouslySetInnerHTML={{ __html: purify.sanitize(parsedCode) }} />
    </Wrapper>
  );
}
