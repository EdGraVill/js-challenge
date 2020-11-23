import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { currentQuestionSelector, questionsActions, resultsSelector } from '../QuestionsEngine';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 1rem;
  justify-content: center;
  width: 100%;
`;

const Bullet = styled.button<{ isRight: boolean | null; isSelected: boolean }>`
  ${({ isRight, isSelected, theme: { colors } }) => css`
    background-color: ${typeof isRight !== 'boolean'
      ? colors.inlineCodeBackground
      : !isRight
      ? colors.optionWrong
      : colors.optionRight};
    border: 0;
    border-radius: 50%;
    cursor: pointer;
    height: 1rem;
    margin: 0 0.5rem 1rem 0.5rem;
    opacity: ${isSelected ? 1 : 0.5};
    padding: 0;
    transform: scale(${!isSelected ? 0.5 : 0.75});
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    width: 1rem;

    &:hover:not(:disabled) {
      transform: scale(1);
    }

    &:disabled {
      cursor: default;
    }

    &:focus {
      outline: none;
    }
  `}
`;

export default function Bullets() {
  const dispatch = useDispatch();
  const results = useSelector(resultsSelector);
  const currentQuestion = useSelector(currentQuestionSelector);

  const goToQuestion = React.useCallback(
    (ix: number) => () => {
      dispatch(questionsActions.goNQuestion(ix));
    },
    [dispatch],
  );

  return (
    <Container>
      {Array(10)
        .fill(null)
        .map((_, ix) => {
          const isRight = results[ix] ? results[ix].selected === results[ix].right : null;
          const isSelected = currentQuestion === ix;

          return (
            <Bullet
              disabled={isRight === null}
              isRight={isRight}
              isSelected={isSelected}
              key={ix}
              onClick={goToQuestion(ix)}
            />
          );
        })}
    </Container>
  );
}
