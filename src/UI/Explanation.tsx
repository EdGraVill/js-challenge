import * as React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import gfm from 'remark-gfm';
import styled, { css } from 'styled-components';
import Prism from 'prismjs';
import { useSelector } from 'react-redux';
import purify from 'dompurify';
import { CodeContainer, inlineCodeStyle } from './Code';
import { isRTLSelector, localeSelector } from '../store';
import translations from '../translations';
import { isNextQuestionEmptySelector, questionSelector } from '../QuestionsEngine';

const Container = styled.div<{ isRTL: boolean }>`
  ${({ isRTL, theme: { colors } }) => css`
    color: ${colors.text};
    display: flex;
    font-size: 1.2rem;
    justify-content: center;
    line-height: 2.2rem;
    margin-top: 3rem;
    overflow-x: auto;
    width: 100%;

    & > div {
      & > h3 {
        margin: 0 0 2rem;
        text-align: center;
        text-transform: capitalize;
      }

      align-items: stretch;
      display: flex;
      flex-flow: column nowrap;
      max-width: 900px;
      width: 90%;

      & p {
        margin: 0;
        margin-bottom: 1rem;
        direction: ${isRTL ? 'rtl' : 'ltr'};
      }

      & img {
        align-self: center;
        margin-bottom: 1rem;
      }
    }

    code {
      ${inlineCodeStyle}
    }
  `}
`;

const CodeSnipet = styled(CodeContainer)`
  margin-bottom: 1rem;
  width: 100%;
`;

const transformContent = (explanation: string) => {
  const content: JSX.Element[] = [];

  const codeRegex = /(```[a-z]*)([\s\S]*?)(```)/g;

  explanation
    .split(codeRegex)
    .map((chunk) => chunk.trim())
    .forEach((chunk, ix, arr) => {
      if (/^```[a-z]*/.test(chunk) || !chunk || chunk === '```') {
      } else if (ix !== 0 && !/^```[a-z]*/.test(chunk) && arr[ix - 1] !== '```' && /^```[a-z]*/.test(arr[ix - 1])) {
        try {
          const language = arr[ix - 1].replace('```', '');
          const parsedCode = Prism.highlight(chunk, Prism.languages[language], language);

          content.push(<CodeSnipet key={ix} dangerouslySetInnerHTML={{ __html: purify.sanitize(parsedCode) }} />);
        } catch (error) {
          content.push(
            <ReactMarkdown key={ix} plugins={[gfm]} allowDangerousHtml>
              {chunk}
            </ReactMarkdown>,
          );
        }
      } else if (chunk) {
        content.push(
          <ReactMarkdown key={ix} plugins={[gfm]} allowDangerousHtml>
            {chunk}
          </ReactMarkdown>,
        );
      }
    });

  return content;
};

export default function Explanation() {
  const question = useSelector(questionSelector);
  const isRTL = useSelector(isRTLSelector);
  const locale = useSelector(localeSelector);
  const isNextQuestionEmpty = useSelector(isNextQuestionEmptySelector);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;

    if (question.explanation && container && isNextQuestionEmpty) {
      setTimeout(() => {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 1000);
    }
  }, [question.explanation, containerRef, isNextQuestionEmpty]);

  return (
    <Container isRTL={isRTL} ref={containerRef}>
      {question.explanation ? (
        <div>
          <h3>{translations[locale]?.explanation}</h3>
          {transformContent(question.explanation)}
        </div>
      ) : null}
    </Container>
  );
}
