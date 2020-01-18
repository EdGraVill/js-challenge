import * as React from 'react';
import getQuestions, { getAnswers } from './getQuestions';
import Question from './Question';
import { checkAnswersIntegrity, SettingsContext } from '../util';
import styled, { css } from 'styled-components';
import Breadcrumbs from '../UI/Breadcrumbs';
import Summary from './Summary';
import Header from './Header';
import LanguageSelector from '../UI/LanguageSelector';
import useLocalizedText from './useLocalizedText';

const Container = styled.main`
  ${({ theme: { colors } }: { theme: Theme }) => css`
    background-color: ${colors.background};
    box-sizing: border-box;
    min-height: calc(100vh - 6rem);
    width: 100%;
  `}
`;

const Questions = () => {
  const [secureQuestions, setSecureQuestions] = React.useState<SecureQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(0);
  const safeAnswersHook = React.useState<Answer[]>([]);
  const [safeAnswers, setSafeAnswers] = safeAnswersHook;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const currentLanguage = React.useContext(SettingsContext).language;
  const [previousLanguage, setPreviousLanguage] = React.useState<string>(currentLanguage);
  const l = useLocalizedText();

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
    if (!secureQuestions.length || currentLanguage !== previousLanguage) {
      setPreviousLanguage(currentLanguage);
      setSafeAnswers([]);
      getQuestions(currentLanguage).then((questions) => {
        setSecureQuestions(questions);
        setCurrentQuestion(0);
        setSafeAnswers(getAnswers());
      });
    }
  }, [secureQuestions, setSafeAnswers, currentLanguage, previousLanguage]);

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
    return <p>{l('questions.loading')}</p>
  }

  return (
    <>
      <Header />
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
        <LanguageSelector />
      </Container>
    </>
  );
}

export default Questions;
