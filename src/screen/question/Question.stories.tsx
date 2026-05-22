import type { Meta, StoryObj } from '@storybook/react';

import Question from './Question';

const meta: Meta<typeof Question> = {
  argTypes: {
    language: {
      control: {
        labels: {
          English: 'en-EN',
        },
        type: 'select',
      },
      name: 'language',
      type: {
        name: 'string',
        required: true,
      },
    },
    question: {
      name: 'question',
      type: {
        name: 'other',
        required: true,
        value: '',
      },
    },
  },
  component: Question,
  // tags: ['autodocs'],
  title: 'Screens/Question',
};

export default meta;
type Story = StoryObj<typeof Question>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    language: 'en-EN',
    question: {
      availableLanguages: [
        'en-EN',
        'bs-BS',
        'de-DE',
        'es-ES',
        'fr-FR',
        'id-ID',
        'it-IT',
        'ja-JA',
        'ko-KR',
        'nl-NL',
        'pt-BR',
        'ru-RU',
        'tr-TR',
        'uk-UA',
        'vi-VI',
        'zh-CN',
        'zh-TW',
      ],
      options: {
        'en-EN': ['`true` `false` `true`', '`false` `false` `true`', '`true` `false` `false`', '`false` `true` `true`'],
        'bs-BS': ['`true`` false` `true`', '`false`` false` `true`', '`true`` false` `false`', '`false`` true` `true`'],
        'de-DE': ['`true` `false` `true`', '`false` `false` `true`', '`true` `false` `false`', '`false` `true` `true`'],
        'es-ES': ['`true` `false` `true`', '`false` `false` `true`', '`true` `false` `false`', '`false` `true` `true`'],
        'fr-FR': ['`true` `false` `true`', '`false` `false` `true`', '`true` `false` `false`', '`false` `true` `true`'],
        'id-ID': ['`true` `false` `true`', '`false` `false` `true`', '`true` `false` `false`', '`false` `true` `true`'],
        'it-IT': ['`true` `false` `true`', '`false` `false` `true`', '`true` `false` `false`', '`false` `true` `true`'],
        'ja-JA': ['`true` `false` `true`', '`false` `false` `true`', '`true` `false` `false`', '`false` `true` `true`'],
        'ko-KR': ['`true` `false` `true`', '`false` `false` `true`', '`true` `false` `false`', '`false` `true` `true`'],
        'nl-NL': ['`true` `false` `true`', '`false` `false` `true`', '`true` `false` `false`', '`false` `true` `true`'],
        'pt-BR': ['`true` `false` `true`', '`false` `false` `true`', '`true` `false` `false`', '`false` `true` `true`'],
        'ru-RU': ['`true` `false` `true`', '`false` `false` `true`', '`true` `false` `false`', '`false` `true` `true`'],
        'tr-TR': ['`true` `false` `true`', '`false` `false` `true`', '`true` `false` `false`', '`false` `true` `true`'],
        'uk-UA': ['`true` `false` `true`', '`false` `false` `true`', '`true` `false` `false`', '`false` `true` `true`'],
        'vi-VI': ['`true` `false` `true`', '`false` `false` `true`', '`true` `false` `false`', '`false` `true` `true`'],
        'zh-CN': ['`true` `false` `true`', '`false` `false` `true`', '`true` `false` `false`', '`false` `true` `true`'],
        'zh-TW': ['`true` `false` `true`', '`false` `false` `true`', '`true` `false` `false`', '`false` `true` `true`'],
      },
      question: {
        'en-EN': "What's the output?",
        'bs-BS': 'Što je izlaz?',
        'de-DE': 'Was wird ausgegeben?',
        'es-ES': '¿Qué devuelve la siguiente función?',
        'fr-FR': 'Quelle est la sortie ?',
        'id-ID': 'Apa yang akan tampil?',
        'it-IT': "Qual è l'output?",
        'ja-JA': '何が出力されるでしょうか？',
        'ko-KR': '무엇이 출력 될까요?',
        'nl-NL': 'Wat is de uitkomst?',
        'pt-BR': 'Qual o resultado?',
        'ru-RU': 'Что будет в консоли?',
        'tr-TR': 'Çıktısı Nedir?',
        'uk-UA': 'Що буде в консолі?',
        'vi-VI': 'Output là gì?',
        'zh-CN': '输出是什么？',
        'zh-TW': '將會輸出什麽內容？',
      },
      code: {
        'en-EN': [
          [
            'javascript',
            'let a = 3;\nlet b = new Number(3);\nlet c = 3;\n\nconsole.log(a == b);\nconsole.log(a === b);\nconsole.log(b === c);',
          ],
        ],
        'bs-BS': [
          [
            'javascript',
            'let a = 3;\nlet b = new Number(3);\nlet c = 3;\n\nconsole.log(a == b);\nconsole.log(a === b);\nconsole.log(b === c);',
          ],
        ],
        'de-DE': [
          [
            'javascript',
            'let a = 3;\nlet b = new Number(3);\nlet c = 3;\n\nconsole.log(a == b);\nconsole.log(a === b);\nconsole.log(b === c);',
          ],
        ],
        'es-ES': [
          [
            'javascript',
            'let a = 3;\nlet b = new Number(3);\nlet c = 3;\n\nconsole.log(a == b);\nconsole.log(a === b);\nconsole.log(b === c);',
          ],
        ],
        'fr-FR': [
          [
            'javascript',
            'let a = 3;\nlet b = new Number(3);\nlet c = 3;\n\nconsole.log(a == b);\nconsole.log(a === b);\nconsole.log(b === c);',
          ],
        ],
        'id-ID': [
          [
            'javascript',
            'let a = 3;\nlet b = new Number(3);\nlet c = 3;\n\nconsole.log(a == b);\nconsole.log(a === b);\nconsole.log(b === c);',
          ],
        ],
        'it-IT': [
          [
            'javascript',
            'let a = 3;\nlet b = new Number(3);\nlet c = 3;\n\nconsole.log(a == b);\nconsole.log(a === b);\nconsole.log(b === c);',
          ],
        ],
        'ja-JA': [
          [
            'javascript',
            'let a = 3;\nlet b = new Number(3);\nlet c = 3;\n\nconsole.log(a == b);\nconsole.log(a === b);\nconsole.log(b === c);',
          ],
        ],
        'ko-KR': [
          [
            'javascript',
            'let a = 3;\nlet b = new Number(3);\nlet c = 3;\n\nconsole.log(a == b);\nconsole.log(a === b);\nconsole.log(b === c);',
          ],
        ],
        'nl-NL': [
          [
            'javascript',
            'let a = 3;\nlet b = new Number(3);\nlet c = 3;\n\nconsole.log(a == b);\nconsole.log(a === b);\nconsole.log(b === c);',
          ],
        ],
        'pt-BR': [
          [
            'javascript',
            'let a = 3;\nlet b = new Number(3);\nlet c = 3;\n\nconsole.log(a == b);\nconsole.log(a === b);\nconsole.log(b === c);',
          ],
        ],
        'ru-RU': [
          [
            'javascript',
            'let a = 3;\nlet b = new Number(3);\nlet c = 3;\n\nconsole.log(a == b);\nconsole.log(a === b);\nconsole.log(b === c);',
          ],
        ],
        'tr-TR': [
          [
            'javascript',
            'let a = 3;\nlet b = new Number(3);\nlet c = 3;\n\nconsole.log(a == b);\nconsole.log(a === b);\nconsole.log(b === c);',
          ],
        ],
        'uk-UA': [
          [
            'javascript',
            'let a = 3;\nlet b = new Number(3);\nlet c = 3;\n\nconsole.log(a == b);\nconsole.log(a === b);\nconsole.log(b === c);',
          ],
        ],
        'vi-VI': [
          [
            'javascript',
            'let a = 3;\nlet b = new Number(3);\nlet c = 3;\n\nconsole.log(a == b);\nconsole.log(a === b);\nconsole.log(b === c);',
          ],
        ],
        'zh-CN': [
          [
            'javascript',
            'let a = 3\nlet b = new Number(3)\nlet c = 3\n\nconsole.log(a == b)\nconsole.log(a === b)\nconsole.log(b === c)',
          ],
        ],
        'zh-TW': [
          [
            'javascript',
            'let a = 3\nlet b = new Number(3)\nlet c = 3\n\nconsole.log(a == b)\nconsole.log(a === b)\nconsole.log(b === c)',
          ],
        ],
      },
    },
  },
};
