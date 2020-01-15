import * as React from 'react';
import styled from 'styled-components';
import MarkdownIt from 'markdown-it';

const markdown = new MarkdownIt();

const Container = styled.aside`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 1.1rem;
  margin: 0 0 5rem;
  width: 90%;

  & p {
    line-height: 2rem;
    text-align: justify;
  }

  & code {
    background-color: #DDD;
    color: #282c34;
    font-family: source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace;
    font-size: 1.1rem;
    padding: .2rem .4rem;
  }
`;

const Title = styled.h3`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 1.5rem;
  text-align: center;
  width: 90%;
`;

interface ExplanationProps {
  explanation: string[];
}

const Explanation = React.forwardRef<HTMLDivElement, ExplanationProps>(({ explanation }, ref) => {
  const content = explanation.reduce((prev, curr) => `${prev}${markdown.render(curr)}`, '');

  return (
    <>
      <Title>Explanation</Title>
      <Container dangerouslySetInnerHTML={{ __html: content }} ref={ref} />
    </>
  );
})

export default Explanation;
