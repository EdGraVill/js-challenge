import * as React from 'react';
import { useSelector } from 'react-redux';
import content from '../questions.json';
import { localeSelector } from '../store';
import { Code, Explanation, Options, Question } from '../UI';
import { randomBetween } from '../util';

const Challenge: React.FC = () => {
  const locale = useSelector(localeSelector);
  const questions = content.find((questions) => questions.locale === locale)!;

  // const question = questions.list[randomBetween(0, questions.list.length - 1)];
  const question = questions.list.find(({ id }) => id === 10)!;

  return (
    <div>
      <Question>{question.question}</Question>
      {question.code && <Code code={question.code} language={question.codeLanguage} />}
      <Options onOptionSelected={(ix) => console.log(ix)} options={question.options} />
      <Explanation isHide={false}>
        {question.explanation}
      </Explanation>
    </div>
  );
};

export default Challenge;
