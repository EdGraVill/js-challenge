import { writeFile } from 'fs';
import { format } from 'prettier';
import { promisify } from 'util';
import { Content } from '../types';

const formatCode = async () => {
  const contentList: Content[] = await import('../questions.json');

  const contentFormated = contentList.map((content) => ({
    ...content,
    list: content.list.map((question) => {
      let code: string | undefined;

      if (question.code) {
        try {
          code = format(question.code, { parser: 'babel', singleQuote: true });
        } catch (error) {
          code = question.code;
        }
      }

      return {
        ...question,
        code,
      };
    }),
  }));

  await promisify(writeFile)('../questions.json', JSON.stringify(contentFormated, undefined, 2));
};

formatCode();
