import * as React from 'react';
import styled from 'styled-components';
import prismTheme from './prismTheme';
import Prism from 'prismjs';

const Wrapper = styled.div`
  margin: 1.5rem 0;
  overflow-x: auto;
  width: 100%;
`;

const Container = styled.div`
  color: #E5C07B;
  white-space: pre-wrap;
  ${prismTheme}
  background-color: #282c34;
  border-radius: 1rem;
  box-sizing: border-box;
  font-family: source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace;
  margin: 0 auto;
  padding: 1.25rem 2rem;
  width: 600px;

  &::selection, & *::selection {
    background-color: #67769660;
  }

  @media screen and (max-width: 600px) {
    border-radius: 0; 
  }
`;

interface CodeSnippetProps {
  code: string;
  languaje: 'markup' | 'javascript' | 'css' | 'clike';
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, languaje }) => {
  const parsedCode = Prism.highlight(code, Prism.languages[languaje], languaje);

  return (
    <Wrapper>
      <Container dangerouslySetInnerHTML={{ __html: parsedCode }} />
    </Wrapper>
  )
};

export default CodeSnippet;
