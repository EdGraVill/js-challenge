import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  canGoNextSelector,
  canGoPrevSelector,
  isLastQuestionSelector,
  questionsActions,
  questionSelector,
  resultsSelector,
  startTimeSelector,
} from '../QuestionsEngine';
import { localeSelector } from '../store';
import translations from '../translations';
import { capitalize } from '../util';
import Bullets from './Bullets';
import Button from './Button';
import Clock from './Clock';
import ResultsControls from './ResultsControls';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin: 3rem 0;
  width: 100%;
`;

export default function Controls() {
  const dispatch = useDispatch();
  const canGoNext = useSelector(canGoNextSelector);
  const canGoPrev = useSelector(canGoPrevSelector);
  const locale = useSelector(localeSelector);
  const isLastQuestion = useSelector(isLastQuestionSelector);
  const question = useSelector(questionSelector);
  const startTime = useSelector(startTimeSelector);
  const results = useSelector(resultsSelector);

  const onPrev = React.useCallback(() => {
    dispatch(questionsActions.goPrevQuestion());
  }, [dispatch]);

  const onNext = React.useCallback(() => {
    dispatch(questionsActions.goNextQuestion());
  }, [dispatch]);

  return (
    <Container>
      <Bullets />
      <Button disabled={!canGoPrev} onClick={onPrev}>
        {capitalize(translations[locale].previous)}
      </Button>
      {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
      <Clock startTime={question.result ? question.result.started : startTime!} endTime={question.result?.finished} />
      <Button disabled={!canGoNext} onClick={onNext}>
        {isLastQuestion ? capitalize(translations[locale].results) : capitalize(translations[locale].next)}
      </Button>
      {results.length === 10 && <ResultsControls />}
    </Container>
  );
}
