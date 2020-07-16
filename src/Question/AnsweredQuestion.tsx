import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Answered } from './slicer';
import { Title } from './UI';
import { Code } from '../UI';

interface Props {
  answer: Answered;
}

const AnsweredQuestion: React.FC<Props> = ({ answer }) => {
  return (
    <>
      <Title>{answer.question.question}</Title>
      {answer.question.code && (
        <Code code={answer.question.code} language={answer.question.codeLanguage} />
      )}
      {answer.question.options.map((option, ix) => (
        <button disabled={true} key={ix}>
          <ReactMarkdown source={option} />
        </button>
      ))}
    </>
  );
};

export default AnsweredQuestion;
