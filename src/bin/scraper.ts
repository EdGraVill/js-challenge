import { Octokit } from '@octokit/rest';
import { get } from 'https';
import { createWriteStream, exists, mkdir, writeFile, createReadStream, readdir, readFile } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import unraw from 'unraw';
import { Content, Question } from '../types';

require('dotenv').config();

const GH_TOKEN = process.env.GH_TOKEN;
let LAST_MODIFIED = process.env.LAST_MODIFIED;

const isLocale = (str: string) => /[a-z]{2}-[A-Z]{2}/.test(str);

const octokit = new Octokit({
  auth: GH_TOKEN,
});

interface Locale {
  download: string;
  language: string;
  locale: string;
}

interface ListMap {
  [locale: string]: Locale;
}

const getLocalesList = async (): Promise<ListMap | 'cached'> => {
  const repoContent = await octokit.repos.getContent({
    owner: 'lydiahallie', repo: 'javascript-questions', path: '',
  });

  if (LAST_MODIFIED === repoContent.headers['last-modified']) {
    return 'cached';
  } else {
    LAST_MODIFIED = repoContent.headers['last-modified'];

    await promisify(writeFile)(
      '.env',
      `GH_TOKEN=${GH_TOKEN}\nLAST_MODIFIED=${LAST_MODIFIED}\n`,
    );
  }

  const list: ListMap = {
    'en-EN': {
      download: '',
      language: '🇬🇧 English',
      locale: 'en-EN',
    },
  };

  // @ts-ignore
  await Promise.allSettled((repoContent.data as any).map(async (file: any) => {
    if (file.name === 'README.md') {
      list['en-EN'] = {
        ...list['en-EN'],
        download: file.download_url,
      };
    } else if (isLocale(file.name)) {
      const localeContent = await octokit.repos.getContent({
        owner: 'lydiahallie', repo: 'javascript-questions', path: file.name,
      });

      list[file.name] = {
        download: (localeContent.data as any)?.[0]?.download_url,
        language: '',
        locale: file.name,
      };
    }
  }));

  return list;
};

const getLanguages = (data: string): { [locale: string]: string } => {
  const result = /(-\s\[.*)/g.exec(data);

  if (result) {
    const languages = [];
    const regex = /(-\s\[.*)/g;
    let res: RegExpExecArray;

    while ((res = regex.exec(result.input)!) !== null) {
      languages.push(res[0]);
    }

    return languages.reduce((prev, lang) => {
      const a = /(-\s\[)(.*\])(.*\(.\/)([a-z]{2}-[A-Z]{2})/g.exec(lang)!;

      return {
        ...prev,
        [a[4]]: a[2].replace(']', ''),
      };
    }, {});
  }

  return {};
}

const downloadRawMD = (localeName: string, downloadURL: string, folderPath: string, list: ListMap) => new Promise(async (resolve) => {
  const filePath = join(folderPath, `${localeName}.md`);

  const file = createWriteStream(filePath);

  file.on('close', resolve);

  console.info(`Downloading ${localeName} to ${filePath}.\nFROM: ${downloadURL}\n`);

  get(downloadURL, (response) => {
    if (localeName === 'en-EN') {
      response.on('data', (chunk) => {
        const data = chunk.toString('utf8');

        const languages = getLanguages(data);
        Object.keys(languages).forEach((locale) => {
          list[locale].language = languages[locale];
        });
      });
    }

    response.pipe(file);
  });
});

const downloadRawFiles = async (): Promise<ListMap> => {
  const localesList = await getLocalesList();

  if (localesList === 'cached') {
    console.info('Cache restored');

    const list = await promisify(readdir)('./content/raw');
    const enEN = await promisify(readFile)('./content/raw/en-EN.md', 'utf8');
    const languages = getLanguages(enEN);

    return list.reduce((prev, curr): ListMap => {
      const locale = curr.replace('.md', '');

      if (locale === 'en-EN') {
        return {
          ...prev,
          [locale]: {
            download: '',
            language: '🇬🇧 English',
            locale,
          },
        };
      }

      return {
        ...prev,
        [locale]: {
          download: '',
          language: languages[locale],
          locale,
        },
      };
    }, {});
  }
  
  const folderPath = './content/raw/';

  const didFolderExist = await promisify(exists)(folderPath);

  if (!didFolderExist) {
    await promisify(mkdir)(folderPath, { recursive: true });
  }

  await Promise.allSettled(Object.keys(localesList)
    .map(async (locale) => downloadRawMD(locale, localesList[locale].download, folderPath, localesList)));

  return localesList;
};

const parseRawFileToJSON = async (locale: Locale): Promise<Content> => {
  const filePath = `./content/raw/${locale.locale}.md`;
  const stream = createReadStream(filePath, { highWaterMark: 1 * 1024, encoding: 'utf8' });

  let isRTL: boolean = false;

  let isFirstChunk = true;
  let accumulator = '';

  stream.on('data', (chunk: string) => {
    if (isFirstChunk) {
      // Search for the RTL property
      isRTL = chunk.includes('<div dir=\'rtl\'>') || chunk.includes('<div dir="rtl">');
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

  const list = matches.map((rawMatch, ix): Question => {
    let match = rawMatch;
    // QUESTION
    let question: string;
    const questionRegex = /(###### \d{1,3}. )(.*)/g;
    
    const questionResult = questionRegex.exec(match);
    question = questionResult?.[2] || '';
    question = unraw(question).trim();
    match = match.replace(questionResult?.[0] || '', '');

    // CODE
    let code: string | undefined;
    let codeLanguage: string | undefined;
    const codeRegex = /(```.*)([a-z]*\n[\s\S]*?\n)(```)/g;

    const codeResult = codeRegex.exec(match);
    code = codeResult?.[2];
    code = code ? unraw(code).trim() : undefined;
    codeLanguage = codeResult?.[1].replace('```', '');

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
    const explanationRegex = /(#{4}.*:)(.*)([^#]*)/g;

    const explanationResult = explanationRegex.exec(match);

    explanation = explanationResult?.[3]
      .replace('</p>', '')
      .replace('</div>', '')
      .replace('</details>', '')
      .replace(/---/g, '')
      .trim() || '';
    explanation = unraw(explanation);

    return {
      answer,
      code,
      codeLanguage,
      explanation,
      id: ix,
      options,
      question,
    };
  });

  return {
    isRTL,
    language: locale.language,
    list,
    locale: locale.locale,
  };
};

const generateQuestions = async () => {
  const locales = await downloadRawFiles();

  // @ts-ignore
  const allContentRow = await Promise.allSettled(Object.values(locales).map(async (locale) =>
    parseRawFileToJSON(locale)));

  const allContent = allContentRow.map((locale: { status: 'fulfilled' | 'rejected', value?: Content, reason?: Content }) => {
    if (locale.status === 'fulfilled' && locale?.value?.list.length) {
      return locale.value;
    }

    return null;
  }).filter(Boolean) as Content[];

  await promisify(writeFile)('./src/questions.json', JSON.stringify(allContent, undefined, 2));
};

generateQuestions();
