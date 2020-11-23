import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { questionsActions, currentQuestionSelector } from '../QuestionsEngine';
import { localeSelector } from '../store';
import translations from '../translations';
import { capitalize } from '../util';
import Button from './Button';
import Link from './Link';

const Container = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  width: 100%;
`;

export default function ResultsControls() {
  const disptach = useDispatch();
  const locale = useSelector(localeSelector);
  const currentQuestion = useSelector(currentQuestionSelector);

  const onNewChallenge = React.useCallback(() => {
    disptach(questionsActions.newChallenge());
  }, [disptach]);

  const onGoToResults = React.useCallback(() => {
    disptach(questionsActions.goNQuestion(10));
  }, [disptach]);

  return (
    <Container>
      {currentQuestion === 10 ? (
        <Button onClick={onNewChallenge}>{capitalize(translations[locale].new)}</Button>
      ) : (
        <Link onClick={onGoToResults}>{capitalize(translations[locale].results)}</Link>
      )}
    </Container>
  );
}
