import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { questionsActions, resultsSelector } from '../QuestionsEngine';
import Clock from './Clock';

const Content = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-flow: column wrap;
  height: calc(3rem * 5);
  width: 20rem;
`;

const Result = styled.button<{ isRight: boolean; ix: number }>`
  ${({ isRight, ix, theme: { colors } }) => css`
    background-color: ${isRight ? colors.optionRight : colors.optionWrong}33;
    border: 1px solid ${isRight ? colors.optionRight : colors.optionWrong};
    border-radius: 0 0.5rem 0.5rem 0;
    cursor: pointer;
    height: 2rem;
    padding: 0 0.75rem;
    position: relative;
    margin: 0 0 1rem 2rem;

    &::after {
      align-items: center;
      background-color: ${isRight ? colors.optionRight : colors.optionWrong};
      border: 1px solid ${isRight ? colors.optionRight : colors.optionWrong};
      border-radius: 0.5rem 0 0 0.5rem;
      color: ${colors.codeBackground};
      content: '${(ix + 1).toString()}';
      display: flex;
      font-size: 1.2rem;
      font-weight: bold;
      height: 100%;
      justify-content: center;
      position: absolute;
      right: 100%;
      top: -1px;
      width: 2rem;
    }

    & > div {
      color: ${isRight ? colors.optionRight : colors.optionWrong};
      line-height: 2rem;
      margin: 0;
      text-align: center;
      width: 5rem;
    }

    &:focus {
      outline: none;
    }
  `}
`;

export default function Results() {
  const dispatch = useDispatch();
  const results = useSelector(resultsSelector);

  const goToQuestion = React.useCallback(
    (ix: number) => () => {
      dispatch(questionsActions.goNQuestion(ix));
    },
    [dispatch],
  );

  return (
    <Content>
      <Container>
        {results.map((result, ix) => (
          <Result isRight={result.selected === result.right} ix={ix} key={result.id} onClick={goToQuestion(ix)}>
            <Clock startTime={result.started} endTime={result.finished} />
          </Result>
        ))}
      </Container>
    </Content>
  );
}
