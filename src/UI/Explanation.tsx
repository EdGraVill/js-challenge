import * as React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import gfm from 'remark-gfm';
import styled, { css } from 'styled-components';
import Prism from 'prismjs';
import { useSelector } from 'react-redux';
import { CodeContainer, inlineCodeStyle } from './Code';
import { isRTLSelector, localeSelector } from '../store';
import translations from '../translations';

const Container = styled.div<{ isRTL: boolean }>`
  ${({ isRTL, theme: { colors, fonts } }) => css`
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

interface Props {
  children: string;
  isHide: boolean;
}

const Explanation: React.FC<Props> = ({ isHide, children }) => {
  const isRTL = useSelector(isRTLSelector);
  const locale = useSelector(localeSelector);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;

    if (!isHide && container) {
      setTimeout(() => {
        container.scrollIntoView({ behavior: 'smooth' });
      }, 3000);
    }
  }, [isHide]);

  const content: JSX.Element[] = [];

  const codeRegex = /(```[a-z]*)([\s\S]*?)(```)/g

  children
    .split(codeRegex)
    .map(chunk => chunk.trim())
    .forEach((chunk, ix, arr) => {
      if (/^```[a-z]*/.test(chunk) || !chunk || chunk === '```') {
      } else if (ix !== 0 && !/^```[a-z]*/.test(chunk) && arr[ix - 1] !== '```' && /^```[a-z]*/.test(arr[ix - 1])) {
        try {
          const language = arr[ix - 1].replace('```', '');
          const parsedCode = Prism.highlight(chunk, Prism.languages[language], language);
  
          content.push(<CodeSnipet key={ix} dangerouslySetInnerHTML={{ __html: parsedCode }} />);
        } catch (error) {
          content.push(<ReactMarkdown key={ix} plugins={[gfm]} allowDangerousHtml>{chunk}</ReactMarkdown>)
        }
      } else if (chunk) {
        content.push(<ReactMarkdown key={ix} plugins={[gfm]} allowDangerousHtml>{chunk}</ReactMarkdown>)
      }
    });

  return (
    <Container isRTL={isRTL}>
      {!isHide && (
        <div>
          <h3>{translations[locale].explanation}</h3>
          {content}
        </div>
      )}
    </Container>
  );
};

export default Explanation;
