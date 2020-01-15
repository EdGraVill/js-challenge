import { createWriteStream } from 'fs';
import axios from 'axios';
import * as MarkdownIt from 'markdown-it';
import Token from 'markdown-it/lib/token';

const QUESTIONS_URL = 'https://raw.githubusercontent.com/lydiahallie/javascript-questions/master/README.md';

const getRawData = async (): Promise<string> => {
  const { data: rawData } = await axios.get<string>(QUESTIONS_URL);

  return rawData;
};

interface Question {
  answer: number;
  explanation: string[];
  id: number;
  options: string[];
  problem: string;
  question: string;
}

const lettersMap = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const extractQuestion = (questionFragments: Token[], id: number): Question => {
  const problem = questionFragments.find(({ type }) => type === 'fence')?.content || '';
  const question = questionFragments[1].content.split('. ')[1];
  
  // Idk if use a forEach to search those ix is better than find ix separately
  const optionsRangeStart = questionFragments.findIndex(({ type }) => type === 'bullet_list_open');
  const optionsRangeEnd = questionFragments.findIndex(({ type }) => type === 'bullet_list_close');
  const options = questionFragments
    .slice(optionsRangeStart, optionsRangeEnd)
    .filter(({ type }) => type === 'inline')
    .map(({ content }) => content)
    .sort((a, b) => lettersMap.indexOf(a[0]) - lettersMap.indexOf(b[0]))
    .map(option => option.split(': ').slice(1).join(''));

  const answerIx = questionFragments.findIndex(({ type, tag }) => type === 'heading_open' && tag === 'h4') + 1;
  const answerText = questionFragments[answerIx].content;
  const answer = lettersMap.indexOf(answerText[answerText.length - 1]);

  const explanation = questionFragments
    .slice(answerIx + 2)
    .filter(({ content, type }) => type === 'inline' && content !== '</p>\n</details>')
    .map(({ content }) => content);

  return {
    answer,
    explanation,
    id,
    options,
    problem,
    question,
  };
};

const parseData = (rawData: string): Question[] => {
  const markdown = new MarkdownIt();

  const parsedData = markdown.parse(rawData, {});

  // get questions fractions
  const questionStartAt: number[] = [];
  parsedData.forEach((token: Token, ix: number) => {
    if (token.markup === '######' && token.type === 'heading_open') {
      questionStartAt.push(ix);
    }
  });
  const questionFragments = questionStartAt.map((startIx, ix) => {
    const endIx = questionStartAt[ix + 1] || undefined;

    return parsedData.slice(startIx, endIx);
  });

  return questionFragments.map(extractQuestion);
};

const saveData = (data: string) => new Promise((resolve) => {
  const stream = createWriteStream('./src/questions/en-US.json');

  stream.end(data);

  stream.on('close', () => {
    resolve();
  });
});

const main = async () => {
  const rawData = await getRawData();
  const data = parseData(rawData);

  await saveData(JSON.stringify(data, undefined, 2));
}

main();
