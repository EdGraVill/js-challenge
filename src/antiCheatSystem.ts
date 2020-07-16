import { StoredAnswer } from './types';

const STORE_KEY = 'store_key';

const erase = (id: string): Error => {
  const commonMessage = 'Compromised stored data. Erasing data...';
  const errorMessage = process.env.NODE_ENV === 'production'
    ? commonMessage
    : `${id}: Compromised stored data. Erasing data...`;

  console.warn(errorMessage);
  localStorage.removeItem(STORE_KEY);

  localStorage.setItem(STORE_KEY, JSON.stringify([]));

  return new Error(errorMessage);
}

const store = (answers: StoredAnswer[]) => {
  localStorage.setItem(STORE_KEY, JSON.stringify(answers));
}

const digest = async (answers: StoredAnswer[]): Promise<string> => {
  const encoder = new TextEncoder();

  const data = !answers.length
    ? encoder.encode('init')
    : encoder.encode(JSON.stringify(answers));

  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
}

const testIntegrity = async (answers: StoredAnswer[]): Promise<boolean> => {
  let draft = [...answers].reverse();

  // @ts-ignore
  const results = await Promise.allSettled(draft.map(async (answer, ix) => {
    const hash = await digest(draft.slice(ix + 1).reverse());

    return answer.hash === hash;
  }));

  return results
    .map((res: { status: 'fulfilled' | 'rejected', value?: boolean, reason?: boolean }) => Boolean(res?.value))
    .reduce((prev: boolean, curr: boolean) => Boolean(
      Number(prev) * Number(curr),
    ), true);
}

const antiCheatSystem = (): [
  () => void,
  (answer: Omit<StoredAnswer, 'rightAnswer' | 'hash'>) => Promise<StoredAnswer>,
  (locale: string) => StoredAnswer[],
] => {
  const memory: StoredAnswer[] = [];

  const init = (isClosing = false) => {
    const rawData = localStorage.getItem(STORE_KEY);

    if (rawData) {
      try {
        const parsedArray = JSON.parse(rawData);

        if (parsedArray instanceof Array) {
          if (!isClosing) {
            memory.push(...parsedArray);
          }

          const startDate = Date.now();
          testIntegrity(memory).then((result) => {
            const endDate = Date.now();
            if (!result) {
              erase('Bad Integrity');
            } else {
              if (process.env.NODE_ENV !== 'production') {
                console.info(`Integrity is OK - ${memory.length} elements in ${endDate - startDate} ms`);
              }
            }
          });
        } else {
          erase('Not an Array');
        }
      } catch (error) {
        erase('Parse fail');
      }
    } else {
      store(memory);
    }

    window.addEventListener('beforeunload', () => {
      init(true);
    });
  };

  const submitQuestion = async (answer: Omit<StoredAnswer, 'rightAnswer' | 'hash'>): Promise<StoredAnswer> => {
    const integrity = await testIntegrity(memory);

    if (!integrity) {
      throw erase('Bad integrity');
    }

    if (JSON.stringify(Object.keys(answer).sort()) !== '["answer","date","id","locale","time"]') {
      throw erase('Bad incoming answer');
    }

    if (JSON.stringify(memory) !== localStorage.getItem(STORE_KEY)) {
      throw erase('Corrupted data');
    }

    const data = await import('./questions.json');
    const localized = data.default.find(({ language }) => answer.locale === language);

    if (!localized) {
      throw erase('Local not found');
    }

    const question = localized.list.find(({ id }) => answer.id === id);

    if (!question) {
      throw erase('Wrong question id');
    }

    const hash = await digest(memory);

    const serializedAnswer = {
      ...answer,
      hash,
      rightAnswer: question.answer,
    };

    memory.push(serializedAnswer);

    store(memory);

    return serializedAnswer;
  };

  const getStoredAnswers = (locale: string): StoredAnswer[] => {
    return memory
      .filter(answer => answer.locale === locale)
      .sort((a, b) => b.date - a.date);
  }

  return [init, submitQuestion, getStoredAnswers];
}

export const [init, submitQuestion, getStoredAnswers] = antiCheatSystem();
