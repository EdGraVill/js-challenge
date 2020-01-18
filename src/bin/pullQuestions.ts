import { createWriteStream, readdir, readFile, unlink, writeFile } from 'fs';
import axios from 'axios';
import * as MarkdownIt from 'markdown-it';
import Token from 'markdown-it/lib/token';
import { promisify } from 'util';

const QUESTIONS_URL = 'https://raw.githubusercontent.com/lydiahallie/javascript-questions/master/README.md';

const getTranslatedQuestionsUrl = (locale: string): string => {
  return `https://raw.githubusercontent.com/lydiahallie/javascript-questions/master/${locale}`;
};

const getRawData = async (url: string = QUESTIONS_URL): Promise<string> => {
  const { data: rawData } = await axios.get<string>(url);

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

const parseData = (rawData: string): Token[] => (new MarkdownIt()).parse(rawData, {});

const extractQuestions = (tokens: Token[]): Question[] => {
  // get questions fractions
  const questionStartAt: number[] = [];
  tokens.forEach((token: Token, ix: number) => {
    if (token.markup === '######' && token.type === 'heading_open') {
      questionStartAt.push(ix);
    }
  });
  const questionFragments = questionStartAt.map((startIx, ix) => {
    const endIx = questionStartAt[ix + 1] || undefined;

    return tokens.slice(startIx, endIx);
  });

  return questionFragments.map(extractQuestion);
};

const saveData = (name: string, data: string, destination: string = 'questions') => new Promise((resolve) => {
  const stream = createWriteStream(`./src/${destination}/${name}.json`);

  stream.end(data);

  stream.on('close', () => {
    resolve();
  });
});

const extractAvailableTranslations = (tokens: Token[]): Array<[string, string]> => {
  const locales = tokens.filter(
    ({type, children }) =>
      type === 'inline' &&
      children[0]?.type === 'link_open' &&
      children[0]?.attrs[0]?.[0] === 'href' &&
      children[0]?.attrs[0]?.[1].includes('.md'),
  );

  const extracedTransalions = locales.map(({ children }) => [
    children[1]?.content,
    children[0]?.attrs[0]?.[1].replace('./', ''),
  ] as [string, string]);

  return extracedTransalions;
};

const downloadTranslations = async (tokens: Token[]): Promise<Array<[string, string]>> => {
  const availableTranslations = extractAvailableTranslations(tokens);

  const data: Array<[string, string]> = [];

  const donwloadOtherTranslatiosn = availableTranslations.map(async ([language, locale]) => {
    data.push([language, locale.split('/')[0]]);

    try {
      const rawData = await getRawData(getTranslatedQuestionsUrl(locale));
      console.info(`${language} downloaded`);

      return rawData;
    } catch (error) {
      console.error(`Could not download ${language}`);
      return undefined;
    }
  });

  (await Promise.all(donwloadOtherTranslatiosn))
    .filter(Boolean)
    .forEach(async (translatedRawData, ix) => {
      const [_, locale] = availableTranslations[ix];

      const translatedTokens = parseData(translatedRawData);
      const translatedData = extractQuestions(translatedTokens);

      await saveData(locale.split('/')[0], JSON.stringify(translatedData, undefined, 2));
    });

  return data;
};

const validateQuestions = async () => {
  const downloadedQuestions = await promisify(readdir)('./src/questions');

  await Promise.all(downloadedQuestions.map(async (fileName) => {
    const fileLocation = `./src/questions/${fileName}`;
    const file = (await promisify(readFile)(fileLocation)).toString();
    const parsedFile: Question[] = JSON.parse(file);

    if (parsedFile.length) {
      const purgedFile = parsedFile.filter(({ answer }) => answer !== -1);

      if (purgedFile.length) {
        await saveData(fileName.split('.')[0], JSON.stringify(purgedFile, undefined, 2));
      } else {
        await promisify(unlink)(fileLocation);
      }
    } else {
      await promisify(unlink)(fileLocation);
    }
  }));
};

const createI18nFiles = async (info: Array<[string, string]>) => {
  const downloadedQuestions = await promisify(readdir)('./src/questions');

  const translationsInfo = [{
    name: 'English',
    locale: 'en-US',
  }];

  await Promise.all(downloadedQuestions.map(async (fileName) => {
    if (!fileName.includes('en-US')) {
      const [language, locale] = info.find((el) => el[1] === fileName.split('.')[0]);

      translationsInfo.push({
        name: language,
        locale,
      });
    }

    try {
      await promisify(readFile)(`./src/i18n/${fileName}`);
    } catch (error) {
      const sample = (await promisify(readFile)('./src/i18n/en-US.json')).toString();
      
      await saveData(fileName.split('.')[0], sample, 'i18n');
    }
  }));

  await promisify(writeFile)('./src/translationsInfo.ts', `export default ${JSON.stringify(translationsInfo, undefined, 2).replace(/"([^(")"]+)":/g,"$1:").replace(/"/g, '\'')} as TranslationInfo[]`);
};

const main = async () => {
  const rawData = await getRawData();
  const tokens = parseData(rawData);
  const data = extractQuestions(tokens);

  await saveData('en-US', JSON.stringify(data, undefined, 2));

  const info = await downloadTranslations(tokens);

  await validateQuestions();

  await createI18nFiles(info);
};

main();
