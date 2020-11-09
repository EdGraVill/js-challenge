import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isWelcomeScreenSelector, questionsActions, questionSelector } from '../QuestionsEngine';
import { Code, Controls, Explanation, Options, Question } from '../UI';
import WelcomeScreen from './WelcomeScreen';

const Challenge: React.FC = () => {
  const dispatch = useDispatch();
  const isWelcomeScreen = useSelector(isWelcomeScreenSelector);
  const question = useSelector(questionSelector);

  const onSelectOption = React.useCallback((answer: number) => {
    dispatch(questionsActions.answer(answer));
  }, [dispatch])

  if (isWelcomeScreen) {
    return <WelcomeScreen />;
  }

  return (
    <div>
      <Question>{question.question}</Question>
      {question.code && (
        <Code code={question.code} language={question.codeLanguage} />
      )}
      <Options
        onSelecteOption={onSelectOption}
        options={question.options}
        rightOption={question.result?.right}
        selectedOption={question.result?.selected}
      />
      <Controls />
      <Explanation>
        {question.explanation}
      </Explanation>
    </div>
  );
};

export default Challenge;
