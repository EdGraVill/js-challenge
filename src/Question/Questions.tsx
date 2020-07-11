import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { questionsActions } from './slicer';
import { isQuestionsLoading, answeredCountSelector, selectedQuestionSelector } from './selectors';
import { SafeQuestion } from '../types';

const Questions: React.FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(questionsActions.requestFirstQuestion());
  }, [dispatch]);

  const submitAnswer = React.useCallback((answer: number) => () => {
    dispatch(questionsActions.submitAnswer(answer));
  }, [dispatch]);

  const answeredCount = useSelector(answeredCountSelector);
  const isLoading = useSelector(isQuestionsLoading);

  const selectedQuestion = useSelector(selectedQuestionSelector);

  const onPrevious = React.useCallback(() => {
    dispatch(questionsActions.previousQuestion());
  }, [dispatch]);

  const onNext = React.useCallback(() => {
    dispatch(questionsActions.nextQuestion());
  }, [dispatch]);

  if (!answeredCount && isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(selectedQuestion, undefined, 2)}</pre>
      {
        typeof selectedQuestion?.question === 'string' &&
        (selectedQuestion as SafeQuestion)?.options.map((option, ix) => (
          <button onClick={submitAnswer(ix)}>{option}</button>
        ))
      }
      <br />
      <br />
      <button onClick={onPrevious}>Previous</button>
      <br />
      <button onClick={onNext}>Next</button>
      <br />
    </div>
  )
};

export default Questions;
