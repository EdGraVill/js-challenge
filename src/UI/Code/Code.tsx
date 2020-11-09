import * as React from 'react';
import styled, { css } from 'styled-components';
import prismTheme from './prismTheme';
import Prism from 'prismjs';

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
    color: #E5C07B;
    font-family: ${fonts.code};
    white-space: pre-wrap;
    ${prismTheme}
    background-color: ${colors.codeBackground};
    border-radius: 1rem;
    box-sizing: border-box;
    direction: ltr;
    font-size: .9rem;
    padding: 1.25rem 2rem;
    line-height: 1.3rem;
    width: 600px;

    &::selection, & *::selection {
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

interface CodeSnippetProps {
  code: string;
  language?: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, language = 'javascript' }) => {
  const parsedCode = Prism.highlight(code, Prism.languages[language], language);

  React.useEffect(() => {
    const listener = function(e: ClipboardEvent) {
      const text_only = document?.getSelection()?.toString();
      const clipdata = e.clipboardData;

      if (process.env.NODE_ENV === 'production' && text_only?.includes(code)) {
        clipdata?.setData('text/plain', 'Don\'t be a cheater');
        clipdata?.setData('text/html', 'Don\'t be a cheater');
      } else {
        clipdata?.setData('text/plain', text_only || '');
        clipdata?.setData('text/html', text_only || '');
      }

      e.preventDefault();
    };

    document.addEventListener('copy', listener);

    return () => {
      document.removeEventListener('copy', listener);
    }
  }, [code]);

  return (
    <Wrapper>
      <CodeContainer dangerouslySetInnerHTML={{ __html: parsedCode }} />
    </Wrapper>
  )
};

export default CodeSnippet;
