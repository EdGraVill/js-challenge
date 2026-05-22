import { Code, Md, Options } from '@/components';
import type { AvailableLanguage, Question as QuestionType } from '@/globalTypes';
import type { FC } from 'react';

type UnsolvedQuestion = Omit<QuestionType, 'answer' | 'explanation' | 'id'>;

interface Props {
  language: AvailableLanguage;
  question: UnsolvedQuestion;
}

const Question: FC<Props> = ({ question, language }) => {
  return (
    <main className="flex w-full flex-col items-center gap-y-4">
      <h1 className="text-2xl font-bold">
        <Md>{question.question[language]}</Md>
      </h1>
      <div className="w-full max-w-lg">
        {question.code &&
          question.code[language].map(([lang, code]) => <Code code={code} key={code} language={lang} />)}
      </div>
      <Options onOptionSelected={console.log} options={question.options[language]} />
    </main>
  );
};

export default Question;
