import { Octokit } from '@octokit/core';
import { createHash } from 'crypto';
import isAfter from 'date-fns/isAfter';
import { createWriteStream } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { get } from 'https';
import { remark } from 'remark';

interface Question {
  answer: number;
  code?: Array<[lang: string, code: string]>;
  explanation: string;
  id: number;
  options: string[];
  question: string;
}

interface LocaleContent {
  flag: string;
  isRTL: boolean;
  language: string;
  languageCode: string;
  questions: Question[];
  url: string;
}

interface Locales {
  [languageCode: string]: Omit<LocaleContent, 'questions'>;
}

interface I18NQuestion {
  answer: number;
  availableLanguages: string[];
  code?: Record<string, Array<[lang: string, code: string]>>;
  explanation: Record<string, string>;
  id: number;
  options: Record<string, string[]>;
  question: Record<string, string>;
}

class Scrap {
  private static readonly ignoreLanguages = ['ar-EG'];

  private static readonly optionsMap = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
  };

  private static readonly questionsRepo = {
    name: 'javascript-questions',
    owner: 'lydiahallie',
  };

  private static readonly ownRepo = {
    name: 'js-challenge',
    owner: 'edgravill',
  };

  private static async storeImage(origin: string, destination: string) {
    return new Promise<void>((resolve, reject) => {
      get(origin, (res) => res.pipe(createWriteStream(destination)).on('error', reject).on('finish', resolve));
    });
  }

  private readonly octokit: Octokit;
  private readonly rawContent: Record<string, Parameters<(typeof remark)['run']>[0]> = {};
  private readonly localeContent: Record<string, LocaleContent> = {
    'en-EN': {
      flag: '🇬🇧',
      isRTL: false,
      language: 'English',
      languageCode: 'en-EN',
      questions: [],
      url: 'README.md',
    },
  };
  private readonly locales: Locales = {};
  private readonly content: I18NQuestion[] = [];
  private readonly imagesMap: Record<string, string> = {};

  private shouldUpdate = false;

  constructor() {
    this.octokit = new Octokit({ auth: process.env.GH_TOKEN });
  }

  private async check() {
    const {
      repository: { pushedAt: questionsPushedAt },
    }: { repository: { pushedAt: string } } = await this.octokit.graphql(
      `
      query repo($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
          pushedAt
        }
      }
    `,
      { ...Scrap.questionsRepo },
    );

    const {
      repository: { pushedAt: ownPushedAt },
    }: { repository: { pushedAt: string } } = await this.octokit.graphql(
      `
      query repo($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
          pushedAt
        }
      }
    `,
      { ...Scrap.ownRepo },
    );

    if (isAfter(new Date(questionsPushedAt), new Date(ownPushedAt))) {
      this.shouldUpdate = true;
    }
  }

  private processAvailableLanguages() {
    const languagesRaw = this.rawContent['en-EN'].children.find(({ type }) => type === 'list');
    if (languagesRaw?.type === 'list') {
      const list = remark().stringify({ children: [languagesRaw], type: 'root' });

      list.split('\n').forEach((line) => {
        if (line) {
          const [flagAndName, urlRaw] = line.split('](./');

          const [flag, language] = flagAndName.slice(5).split(' ');
          const url = urlRaw.slice(0, -1);
          const [languageCode] = url.split('/');

          if (Scrap.ignoreLanguages.includes(languageCode)) {
            return;
          }

          this.localeContent[languageCode] = {
            flag,
            isRTL: false,
            language,
            languageCode,
            questions: [],
            url,
          };
        }
      });
    }
  }

  private async loadEnglishFile() {
    const {
      repository: {
        object: { text },
      },
    }: { repository: { object: { text: string } } } = await this.octokit.graphql(
      `
      query repo($owner: String!, $name: String!, $expression: String!) {
        repository(owner: $owner, name: $name) {
          object(expression: $expression) {
            ... on Blob {
              text
            }
          }
        }
      }
    `,
      {
        ...Scrap.questionsRepo,
        expression: 'master:README.md',
      },
    );

    const tree = remark().parse(text);

    this.rawContent['en-EN'] = tree;

    this.processAvailableLanguages();
  }

  private async loadLanguages() {
    for await (const languageCode of Object.keys(this.localeContent)) {
      if (languageCode === 'en-EN') {
        continue;
      }

      const { url } = this.localeContent[languageCode];

      try {
        const {
          repository: {
            object: { text },
          },
        }: { repository: { object: { text: string } } } = await this.octokit.graphql(
          `
          query repo($owner: String!, $name: String!, $expression: String!) {
            repository(owner: $owner, name: $name) {
              object(expression: $expression) {
                ... on Blob {
                  text
                }
              }
            }
          }
        `,
          {
            ...Scrap.questionsRepo,
            expression: `master:${url}`,
          },
        );

        const tree = remark().parse(text);

        this.rawContent[languageCode] = tree;
        console.info(`Loaded ${languageCode} from ${url}`);
      } catch (error) {
        console.info(`Unable to load ${languageCode} from ${url}`);
        delete this.localeContent[languageCode];
      }
    }
  }

  private async processQuestions(languageCode: string) {
    const thematicBreakIxs: number[] = [];

    for await (const [ix, node] of this.rawContent[languageCode].children.entries()) {
      if (node.type === 'html' && (node.value.includes("dir='rtl'") || node.value.includes('dir="rtl"'))) {
        this.localeContent[languageCode].isRTL = true;
      }

      if (node.type === 'thematicBreak') {
        thematicBreakIxs.push(ix);
      }

      if (node.type === 'html' && node.value.includes('<img')) {
        const url = /(src=")([^"]*)/gi.exec(node.value.replace(/\\"/gi, '"').replace(/ ?= ?/g, '='))?.[2];

        if (url && !this.imagesMap[url]) {
          this.imagesMap[url] = createHash('md5').update(url).digest('hex');

          await Scrap.storeImage(url, `./public/images/${this.imagesMap[url]}.png`);
        }

        if (url && this.imagesMap[url]) {
          node.value = node.value.replace(url, `/images/${this.imagesMap[url]}.png`);
        }
      }
    }

    const sections = thematicBreakIxs.map((thematicBreakIx, ix) => {
      if (ix === 0) {
        return this.rawContent[languageCode].children.slice(0, thematicBreakIx);
      }

      return this.rawContent[languageCode].children.slice(thematicBreakIxs[ix - 1] + 1, thematicBreakIx);
    });

    const questionNodes = sections.filter((section) => {
      if (!section.length) {
        return false;
      }

      if (/\d{1,3}\. /g.test(remark().stringify({ children: [section[0]], type: 'root' }))) {
        return true;
      }

      return false;
    });

    this.localeContent[languageCode].questions = questionNodes
      .map((questionNode) => {
        const question: Question = {
          answer: -1,
          explanation: '',
          id: questionNode[0].type === 'list' && questionNode[0].start ? questionNode[0].start : 0,
          options: [],
          question: '',
        };

        const explanationRaw = questionNode.filter((node, ix) => {
          if (ix === 0) {
            question.question = remark().stringify({ children: [node], type: 'root' });

            if (question.id === 0) {
              question.id = Number(/\d{1,3}\./g.exec(question.question)?.[0] ?? 0);
            }

            question.question = question.question.replace(/#{0,6} ?\d{1,3}\. /g, '').trim();

            return false;
          }

          if (node.type === 'code') {
            question.code = question.code
              ? [...question.code, [node.lang ?? '', node.value]]
              : [[node.lang ?? '', node.value]];

            return false;
          }

          if (node.type === 'list' && question.options.length === 0) {
            question.options = node.children.map((itemNode) => {
              const stringifiedItem = remark()
                .stringify({ children: [itemNode], type: 'root' })
                .replace(/\* {0,6}/g, '')
                .replace(/([A-E]): ?/gi, '')
                .trim();

              return stringifiedItem;
            });

            return false;
          }

          if (
            (node.type === 'heading' &&
              node.children[0].type === 'text' &&
              /(:|：) ?([A-E])/gi.test(node.children[0].value)) ||
            (node.type === 'html' && /(:|：) ?([A-E])/gi.test(node.value))
          ) {
            const stringified = remark().stringify({ children: [node], type: 'root' });
            const letter = (
              /(:|：) ?([A-E])/gi.exec(stringified)?.[2] ?? ''
            ).toUpperCase() as keyof typeof Scrap.optionsMap;

            if (letter && Object.keys(Scrap.optionsMap).includes(letter)) {
              question.answer = Scrap.optionsMap[letter];
            }

            return false;
          }

          return true;
        });

        question.explanation = remark()
          .stringify({ children: explanationRaw, type: 'root' })
          .replace(/<\/?(details|summary|b|div)>/gi, '')
          .trim()
          .split(/<\/?p>/gi)
          .map((p) => p.trim())
          .slice(1)
          .join('\n\n')
          .trim();

        return question;
      })
      .filter((question) => question.answer !== -1);
  }

  private async generateQuestionsFile() {
    console.info('Generating questions file...');

    this.localeContent['en-EN'].questions.forEach((question) => {
      const i18nQuestion: I18NQuestion = {
        answer: question.answer,
        availableLanguages: [],
        explanation: { 'en-EN': question.explanation },
        id: question.id,
        options: { 'en-EN': question.options },
        question: { 'en-EN': question.question },
      };

      Object.keys(this.localeContent).forEach((languageCode) => {
        const translatedQuestion = this.localeContent[languageCode].questions.find(({ id }) => question.id === id);

        if (
          translatedQuestion &&
          translatedQuestion.explanation &&
          translatedQuestion.options &&
          translatedQuestion.question
        ) {
          i18nQuestion.availableLanguages.push(languageCode);
          i18nQuestion.explanation[languageCode] = translatedQuestion.explanation;
          i18nQuestion.options[languageCode] = translatedQuestion.options;
          i18nQuestion.question[languageCode] = translatedQuestion.question;

          if (translatedQuestion.code) {
            i18nQuestion.code = i18nQuestion.code ?? {};

            i18nQuestion.code[languageCode] = translatedQuestion.code;
          }
        }
      });

      this.content.push(i18nQuestion);
    });

    await writeFile('content/questions.json', JSON.stringify(this.content, null, 2));
    console.info('Questions file generated');
  }

  private async saveLocales() {
    await writeFile('content/locales.json', JSON.stringify(this.locales, null, 2));
  }

  public async scrap() {
    await this.check();

    if (!this.shouldUpdate) {
      console.log('No need to update');
      return;
    }

    console.info('Loading English file and available languages');
    await this.loadEnglishFile();
    await this.loadLanguages();

    for await (const languageCode of Object.keys(this.localeContent)) {
      console.info(`Processing ${languageCode}`);
      await this.processQuestions(languageCode);

      const { questions: _, ...locale } = this.localeContent[languageCode];
      this.locales[languageCode] = locale;

      console.info(`Saved ${languageCode} with ${this.localeContent[languageCode].questions.length} questions`);
    }

    await this.saveLocales();
    await this.generateQuestionsFile();
  }

  public async generateGlobalTypes() {
    const fileRaw = await readFile('src/globalTypes.ts', 'utf-8');
    const lines = fileRaw.split('\n');

    const startIx = lines.findIndex((line) => line.includes('/** Autogenerated By Scrap Start */'));
    const endIx = lines.findIndex((line) => line.includes('/** Autogenerated By Scrap End */'));

    const types = `export enum Language {
${Object.keys(this.locales)
  .sort()
  .map((languageCode) => `  '${languageCode}' = '${this.locales[languageCode].language}'`)
  .join(',\n')},
}

export type AvailableLanguage = keyof typeof Language;

export interface Question {
  answer: number;
  availableLanguages: string[];
  code?: Record<string, Array<[lang: string, code: string]>>;
  explanation: Record<string, string>;
  id: number;
  options: Record<string, string[]>;
  question: Record<string, string>;
}`.split('\n');

    lines.splice(startIx + 1, endIx - startIx - 1, ...types);

    await writeFile('src/globalTypes.ts', lines.join('\n'));
  }
}

const scrap = new Scrap();
await scrap.scrap();
await scrap.generateGlobalTypes();
