import * as React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import gfm from 'remark-gfm';
import styled, { css } from 'styled-components';
import Prism from 'prismjs';
import { CodeContainer, inlineCodeStyle } from './Code';

const Container = styled.div`
  ${({ theme: { colors, fonts } }) => css`
    color: ${colors.text};
    display: flex;
    font-size: 1.2rem;
    justify-content: center;
    line-height: 2.2rem;
    margin-top: 3rem;

    & > div {
      align-items: stretch;
      display: flex;
      flex-flow: column nowrap;
      max-width: 900px;
      width: 95%;

      & p {
        margin: 0;
        margin-bottom: 1rem;
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
        console.log(chunk);
        const language = arr[ix - 1].replace('```', '');
        const parsedCode = Prism.highlight(chunk, Prism.languages[language], language);

        content.push(<CodeSnipet key={ix} dangerouslySetInnerHTML={{ __html: parsedCode }} />);
      } else if (chunk) {
        content.push(<ReactMarkdown key={ix} plugins={[gfm]} allowDangerousHtml>{chunk}</ReactMarkdown>)
      }
    });

  return (
    <Container>
      {!isHide && (
        <div>
          {content}
        </div>
      )}
    </Container>
  );
};

export default Explanation;
