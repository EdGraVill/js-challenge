import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { currentQuestionSelector, answeredCountSelector } from './selectors';
import { questionsActions } from './slicer';
import { Page, StepsContainer, RoundButton, Button, ControlButtons } from './UI';

const Navigation: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const answeredCount = useSelector(answeredCountSelector);
  const currentQuestion = useSelector(currentQuestionSelector);

  const onPrevious = React.useCallback(() => {
    dispatch(questionsActions.previousQuestion());
  }, [dispatch]);

  const onNext = React.useCallback(() => {
    dispatch(questionsActions.nextQuestion());
  }, [dispatch]);

  const goTo = React.useCallback((step: number) => () => {
    dispatch(questionsActions.goToQuestion(step));
  }, [dispatch]);

  return (
    <Page>
      <StepsContainer>
        {Array(10).fill(null).map((_, ix) => (
          <RoundButton isCurrent={currentQuestion === ix} key={ix} onClick={goTo(ix)} disabled={ix > answeredCount}>
            <span>{ix + 1}</span>
          </RoundButton>
        ))}
        <Button isCurrent={currentQuestion === 10} onClick={goTo(11)} disabled={answeredCount < 10}>
          <span>Summary</span>
        </Button>
      </StepsContainer>
      {children}
      <ControlButtons>
        <Button onClick={onPrevious} disabled={currentQuestion === 0}>
          <span>Previous</span>
        </Button>
        <Button onClick={onNext} disabled={currentQuestion === answeredCount || currentQuestion === 10}>
          <span>Next</span>
        </Button>
      </ControlButtons>
    </Page>
  );
};

export default Navigation;
