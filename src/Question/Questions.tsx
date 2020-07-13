import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { questionsActions, Answered } from './slicer';
import { isQuestionsLoading, answeredCountSelector, selectedQuestionSelector } from './selectors';
import Navigation from './Navigation';
import Question from './Question';
import { SafeQuestion } from '../types';
import AnsweredQuestion from './AnsweredQuestion';

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

  if ((!answeredCount && isLoading) || !selectedQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <Navigation>
      {typeof selectedQuestion.question === 'string' ? (
        <Question question={selectedQuestion as SafeQuestion} />
      ) : (
        <AnsweredQuestion answer={selectedQuestion as Answered} />
      )}
    </Navigation>
  );
};

export default Questions;
