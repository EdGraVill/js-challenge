import { Octokit } from '@octokit/rest';
import { get } from 'https';
import { createWriteStream, exists, mkdir, writeFile, createReadStream, readdir } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import unraw from 'unraw';

require('dotenv').config();

const GH_TOKEN = process.env.GH_TOKEN;
const LAST_MODIFIED = process.env.LAST_MODIFIED;

const isLocale = (str: string) => /[a-z]{2}-[A-Z]{2}/.test(str);

const octokit = new Octokit({
  auth: GH_TOKEN,
});

const getLocalesList = async (): Promise<{ [locale: string]: string }> => {
  const repoContent = await octokit.repos.getContent({
    owner: 'lydiahallie', repo: 'javascript-questions', path: '',
  });

  if (LAST_MODIFIED === repoContent.headers['last-modified']) {
    return { cached: 'true' };
  } else {
    await promisify(writeFile)(
      '.env',
      `GH_TOKEN=${GH_TOKEN}\nLAST_MODIFIED=${repoContent.headers['last-modified']}\n`,
    );
  }

  const list: { [locale: string]: string } = {
    'en-US': ''
  };

  await Promise.allSettled((repoContent.data as any).map(async (file: any) => {
    if (file.name === 'README.md') {
      list['en-US'] = file.download_url;
    } else if (isLocale(file.name)) {
      const localeContent = await octokit.repos.getContent({
        owner: 'lydiahallie', repo: 'javascript-questions', path: file.name,
      });

      list[file.name] = (localeContent.data as any)?.[0]?.download_url;
    }
  }));

  return list;
};

const downloadRawMD = (localeName: string, downloadURL: string, folderPath: string) => new Promise(async (resolve) => {
  const filePath = join(folderPath, `${localeName}.md`);

  const file = createWriteStream(filePath);

  file.on('close', resolve);

  console.info(`Downloading ${localeName} to ${filePath}.\nFROM: ${downloadURL}\n`);

  get(downloadURL, (response) => {
    response.pipe(file);
  });
});

const downloadRawFiles = async (): Promise<string[]> => {
  const localesList = await getLocalesList();

  if (localesList.cached) {
    console.info('Cache restored');

    const list = await promisify(readdir)('./content/raw');

    return list.map(locale => locale.replace('.md', ''));
  }
  
  const folderPath = './content/raw/';

  const didFolderExist = await promisify(exists)(folderPath);

  if (!didFolderExist) {
    await promisify(mkdir)(folderPath, { recursive: true });
  }

  await Promise.allSettled(Object.keys(localesList)
    .map(async (localeName) => downloadRawMD(localeName, localesList[localeName], folderPath)));

  return Object.keys(localesList);
};

interface Question {
  answer: number;
  code?: string;
  explanation: string;
  id: number;
  options: string[];
  question: string;
}

interface Content {
  isRTL: boolean;
  language: string;
  list: Question[];
}

const parseRawFileToJSON = async (filePath: string): Promise<Content> => {
  const stream = createReadStream(filePath, { highWaterMark: 1 * 1024, encoding: 'utf8' });

  let isRTL: boolean = false;
  const language = filePath.replace('./content/raw/', '').replace('.md', '');

  let isFirstChunk = true;
  let accumulator = '';

  stream.on('data', (chunk: string) => {
    if (isFirstChunk) {
      // Search for the RTL property
      isRTL = chunk.includes('<div dir=\'rtl\'>');
      isFirstChunk = false;
    }

    accumulator += chunk;
  });

  const rawData = await (() => new Promise<string>((resolve) => {
    stream.on('close', () => {
      resolve(accumulator);
    });
  }))();

  const matches = [];
  
  const regex = /((###### \d{1,3}.[^#]*)(#{4}[^#]*))/g;
  let result: RegExpExecArray | null;
  while ((result = regex.exec(rawData)) !== null) {
    matches.push(result[0]);
  }

  const list = matches.map((match, ix): Question => {
    // QUESTION
    let question: string;
    const questionRegex = /(###### \d{1,3}. )(.*)/g;
    
    const questionResult = questionRegex.exec(match);
    question = questionResult?.[2] || '';
    question = unraw(question).trim();

    // CODE
    let code: string | undefined;
    const codeRegex = /(```.*)([a-z]*\n[\s\S]*?\n)(```)/g;

    const codeResult = codeRegex.exec(match);
    code = codeResult?.[2];
    code = code ? unraw(code).trim() : undefined;

    // ANSWER
    let answer = 0;
    const answerRegex = /(#{4}.*:)(.*)/g;

    const answerResult = answerRegex.exec(match);
    const answerChart = answerResult?.[2].trim();

    // OPTIONS
    const options = [];
    const optionsRegex = /(^-[^:]*)(.*)/gm;

    let optionsResult;
    while ((optionsResult = optionsRegex.exec(match)) !== null) {
      const option = unraw(optionsResult[2]).replace(':', '').trim();

      if (option) {
        const optionIx = options.push(option) - 1;
  
        if (optionsResult[0].includes(answerChart!)) {
          answer = optionIx;
        }
      }
    }

    // EXPLANATION
    let explanation: string;
    const explanationRegex = /(#{4}.*:)(.*)([^<]*)/g;

    const explanationResult = explanationRegex.exec(match);
    explanation = explanationResult?.[3].trim() || '';
    explanation = unraw(explanation);

    return {
      answer,
      code,
      explanation,
      id: ix,
      options,
      question,
    };
  });

  return {
    isRTL,
    language,
    list,
  };
};

const generateQuestions = async () => {
  const locales = await downloadRawFiles();

  const allContentRow = await Promise.allSettled(locales.map(async (locale) =>
    parseRawFileToJSON(`./content/raw/${locale}.md`)));

  const allContent = allContentRow.map((locale) => {
    if (locale.status === 'fulfilled' && locale.value.list.length) {
      return locale.value;
    }

    return null;
  }).filter(Boolean) as Content[];

  await promisify(writeFile)('./src/questions.json', JSON.stringify(allContent, undefined, 2));
};

generateQuestions();
