import * as React from 'react';
import getQuestions, { getAnswers } from './getQuestions';
import Question from './Question';
import { checkAnswersIntegrity } from './util';
import styled from 'styled-components';
import Breadcrumbs from './UI/Breadcrumbs';
import Summary from './Summary';

const Container = styled.main`
  background-color: #ecf0f1;
  box-sizing: border-box;
  min-height: 100vh;
  padding-top: 2rem;
  width: 100%;
`;

const Questions = () => {
  const [secureQuestions, setSecureQuestions] = React.useState<SecureQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(0);
  const safeAnswersHook = React.useState<Answer[]>([]);
  const [safeAnswers, setSafeAnswers] = safeAnswersHook;
  const containerRef = React.useRef<HTMLDivElement>(null);

  const reset = React.useCallback(() => {
    setSafeAnswers([]);
    setSecureQuestions([]);
  }, [setSafeAnswers]);

  const goTo = (questionNo: number) => () => {
    if (checkAnswersIntegrity(safeAnswers)) {
      reset();
    } else {
      setCurrentQuestion(questionNo);
    }
  }

  React.useEffect(() => {
    if (!secureQuestions.length) {
      getQuestions().then((questions) => {
        setSecureQuestions(questions);
        setCurrentQuestion(0);
        setSafeAnswers(getAnswers());
      });
    }
  }, [secureQuestions, setSafeAnswers]);

  React.useEffect(() => {
    if (secureQuestions.length && (currentQuestion > 0 && getAnswers()[currentQuestion - 1]?.[1] === null)) {
      console.error('CHEATER!');
      reset();
    }
  }, [currentQuestion, reset, secureQuestions]);

  React.useEffect(() => {
    if (secureQuestions.length) {
      setSafeAnswers(getAnswers());
    }
  }, [currentQuestion, secureQuestions.length, setSafeAnswers]);

  if (!secureQuestions.length || safeAnswers.length < 10) {
    return <p>Loading...</p>
  }

  return (
    <Container ref={containerRef}>
      <Breadcrumbs currentQuestion={currentQuestion} goTo={goTo} safeAnswers={safeAnswers} />
      {currentQuestion === 10 ? (
        <Summary safeAnswers={safeAnswers} />
      ) : (
        <Question
          goTo={goTo}
          questionIx={currentQuestion}
          safeAnswersHook={safeAnswersHook}
          secureQuestion={secureQuestions[currentQuestion]}
          reset={reset}
        />
      )}
    </Container>
  );
}

export default Questions;
