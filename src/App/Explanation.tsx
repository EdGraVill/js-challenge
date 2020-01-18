import * as React from 'react';
import styled, { css } from 'styled-components';
import MarkdownIt from 'markdown-it';
import useLocalizedText from './useLocalizedText';

const markdown = new MarkdownIt();

const Container = styled.aside`
  ${({ theme: { colors, fonts } }: { theme: Theme }) => css`
    font-family: ${fonts.titles};
    font-size: 1.1rem;
    margin: 0 0 5rem;
    width: 90%;

    & p {
      line-height: 2rem;
      text-align: justify;
    }

    & code {
      background-color: ${colors.inlineCodeBackground};
      color: ${colors.inlineCodeColor};
      font-family: ${fonts.code};
      font-size: 1.1rem;
      padding: .2rem .4rem;
    }
  `}
`;

const Title = styled.h3`
  ${({ theme: { fonts } }: { theme: Theme }) => css`
    font-family: ${fonts.titles};
    font-size: 1.5rem;
    text-align: center;
    width: 90%;
  `}
`;

interface ExplanationProps {
  explanation: string[];
}

const Explanation = React.forwardRef<HTMLDivElement, ExplanationProps>(({ explanation }, ref) => {
  const content = explanation.reduce((prev, curr) => `${prev}${markdown.render(curr)}`, '');
  const l = useLocalizedText();

  return (
    <>
      <Title>{l('question.explanation')}</Title>
      <Container dangerouslySetInnerHTML={{ __html: content }} ref={ref} />
    </>
  );
})

export default Explanation;
