import * as React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import gfm from 'remark-gfm';
import styled from 'styled-components';
import { inlineCodeStyle } from './Code';

const Container = styled.h1`
  font-size: 2rem;
  margin: 0 0 3rem;
  padding: 0 10%;
  line-height: 4rem;
  text-align: center;

  * {
    margin: 0;
    padding: 0;
  }

  & code {
    ${inlineCodeStyle};
  }
`;

interface Props {
  children: string | string[];
}

export default function Question({ children }: Props) {
  return (
    <Container>
      <ReactMarkdown plugins={[gfm]}>{children instanceof Array ? children.join('') : children}</ReactMarkdown>
    </Container>
  );
}
