import * as React from 'react';
import content from '../questions.json';
import { Code, Explanation, Question } from '../UI';
import { randomBetween } from '../util';

const Challenge: React.FC = () => {
  const questions = content.find(({ locale }) => locale === 'en-EN')!;

  const question = questions.list[randomBetween(0, questions.list.length - 1)];
  // const question = questions.list.find(({ id }) => id === 5)!;

  return (
    <div>
      <Question>{question.question}</Question>
      {question.code && <Code code={question.code} language={question.codeLanguage} />}
      <Explanation isHide={false}>
        {question.explanation}
      </Explanation>
    </div>
  );
};

export default Challenge;
