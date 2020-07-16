import * as React from 'react';
import { useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { SafeQuestion } from '../types';
import { questionsActions } from './slicer';
import { Title } from './UI';
import { Code } from '../UI';

interface Props {
  question: SafeQuestion;
}

const Question: React.FC<Props> = ({ question }) => {
  const dispatch = useDispatch();

  const submitQuestion = React.useCallback((answer: number) => () => {
    dispatch(questionsActions.submitAnswer(answer));
  }, [dispatch]);

  return (
    <>
      <Title>{question.question}</Title>
      {question.code && (
        <Code code={question.code} language={question.codeLanguage} />
      )}
      {question.options.map((option, ix) => (
        <button key={ix} onClick={submitQuestion(ix)}>
          <ReactMarkdown source={option} />
        </button>
      ))}
    </>
  );
}

export default Question;
