import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Answered } from './slicer';
import { Title } from './UI';

interface Props {
  answer: Answered;
}

const AnsweredQuestion: React.FC<Props> = ({ answer }) => {
  return (
    <>
      <Title>{answer.question.question}</Title>
      {answer.question.code && (<pre>{answer.question.code}</pre>)}
      {answer.question.options.map((option, ix) => (
        <button disabled={true} key={ix}>
          <ReactMarkdown source={option} />
        </button>
      ))}
    </>
  );
};

export default AnsweredQuestion;
