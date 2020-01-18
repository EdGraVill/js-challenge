import * as React from 'react';
import styled, { css } from 'styled-components';
import prismTheme from './prismTheme';
import Prism from 'prismjs';

const Wrapper = styled.div`
  margin: 1.5rem 0;
  overflow-x: auto;
  width: 100%;
`;

const Container = styled.div`
  ${({ theme: { colors, fonts } }: { theme: Theme }) => css`
    color: #E5C07B;
    white-space: pre-wrap;
    ${prismTheme}
    background-color: ${colors.codeBackground};
    border-radius: 1rem;
    box-sizing: border-box;
    font-family: ${fonts.code};
    margin: 0 auto;
    padding: 1.25rem 2rem;
    width: 600px;

    &::selection, & *::selection {
      background-color: ${`${colors.codeSelected}60`};
    }

    @media screen and (max-width: 600px) {
      border-radius: 0; 
    }
  `}
`;

interface CodeSnippetProps {
  code: string;
  language: 'markup' | 'javascript' | 'css' | 'clike';
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, language }) => {
  const parsedCode = Prism.highlight(code, Prism.languages[language], language);

  return (
    <Wrapper>
      <Container dangerouslySetInnerHTML={{ __html: parsedCode }} />
    </Wrapper>
  )
};

export default CodeSnippet;
