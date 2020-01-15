import * as React from 'react';
import styled from 'styled-components';
import MarkdownIt from 'markdown-it';
import { getAnswers } from './getQuestions';
import { checkAnswersIntegrity } from './util';
import CodeSnippet from './UI/CodeSnippet';
import AnswerButton from './UI/AnswerButton';
import Button from './UI/Button';
import Explanation from './UI/Explanation';

const markdown = new MarkdownIt();

const Container = styled.article`
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  margin: 0 auto;
  max-width: 800px;
`;

const QuestionText = styled.h2`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 2rem;
  margin: 0;
  max-width: 600px;
  padding: 0;
  text-align: center;
  width: 90%;
`;

const Options = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  margin: .5rem 0;
  max-width: 600px;
  width: 95%;
`;

const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  margin: .5rem 0;
  max-width: 600px;
  width: 95%;
`;

interface QuestionProps {
  goTo: (ix: number) => () => void;
  questionIx: number;
  safeAnswersHook: [Answer[], React.Dispatch<React.SetStateAction<Answer[]>>];
  secureQuestion: SecureQuestion;
  reset: () => void;
}

const Question: React.FC<QuestionProps> = ({ goTo, questionIx, safeAnswersHook: [safeAnswers, setSafeAnswers], secureQuestion, reset }) => {
  const { getAnswer, options, problem, question } = secureQuestion;
  const [selected, setSelectedLow] = React.useState<number | null>(null);
  const [answer, setAnswer] = React.useState<{ rightAnswer: number, explanation: string[] } | null>(null);
  const explanationRef = React.useRef<HTMLDivElement>(null);

  const setSelected = (selection: number) => () => {
    if (checkAnswersIntegrity(safeAnswers)) {
      reset();
    } else if (selected === null) {
      setSelectedLow(selection);
      setAnswer(getAnswer(selection));
      setSafeAnswers(getAnswers());
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      if (explanationRef.current) {
        explanationRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  });

  React.useEffect(() => {
    setSelectedLow(null);
    setAnswer(null);
    setSafeAnswers(getAnswers());
  }, [secureQuestion, setSafeAnswers]);

  React.useEffect(() => {
    const awr = safeAnswers.find(([id]) => secureQuestion.id === id)!;
    
    if (awr[1] !== null) {
      setSelectedLow(awr[1]);
      setAnswer(getAnswer(awr[1]));
    }
  }, [secureQuestion, safeAnswers, getAnswer]);

  return <Container>
    <QuestionText>{question}</QuestionText>
    <CodeSnippet code={problem} languaje="javascript" />
    <Options>
      {options.map((option, ix) => (
        <AnswerButton
          dangerouslySetInnerHTML={{ __html: markdown.render(option) }}
          isCorrect={answer?.rightAnswer === ix}
          key={option}
          onClick={setSelected(ix)}
          selected={selected === ix}
        />
      ))}
    </Options>
    <Actions>
      <Button
        disabled={questionIx === 0}
        onClick={goTo(questionIx - 1)}
      >
        Previous
      </Button>
      <Button
        disabled={safeAnswers.find(([id]) => secureQuestion.id === id)![1] === null}
        onClick={goTo(questionIx + 1)}
      >
        Next
      </Button>
    </Actions>
    {answer && (
      <Explanation explanation={answer.explanation} ref={explanationRef} />
    )}
  </Container>;
};

export default Question;
