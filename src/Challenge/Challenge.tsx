import * as React from 'react';
import { useSelector } from 'react-redux';
import { isResultsScreenSelector, isWelcomeScreenSelector, questionSelector } from '../QuestionsEngine';
import { Code, Controls, Explanation, Options, Question } from '../UI';
import ResultsScreen from './ResultsScreen';
import WelcomeScreen from './WelcomeScreen';

const Challenge: React.FC = () => {
  const isWelcomeScreen = useSelector(isWelcomeScreenSelector);
  const isResultsScreen = useSelector(isResultsScreenSelector);
  const question = useSelector(questionSelector);

  if (isResultsScreen) {
    return <ResultsScreen />;
  }

  if (isWelcomeScreen) {
    return <WelcomeScreen />;
  }

  return (
    <>
      <Question>{question.question}</Question>
      {question.code && <Code code={question.code} language={question.codeLanguage} />}
      <Options />
      <Controls />
      <Explanation />
    </>
  );
};

export default Challenge;
