import { randomBetween } from './util';

const CURRENT_LANGUAJE = 'en-US';

const getTakens = (): Answer[] => {
  const takenRaw = localStorage.getItem('taken') || '[]';
  return JSON.parse(takenRaw) as Answer[];
}

const secureQuestion = (q: Question): SecureQuestion => {
  const { answer, explanation, id, options, problem, question } = q;

  const getAnswer = (option: number): { rightAnswer: number; explanation: string[] } => {
    const takens = getTakens();
    const takenIx = takens.findIndex(([ix]) => id === ix);
    takens[takenIx][1] = option;
    takens[takenIx][2] = option === answer;
    // store selected option
    localStorage.setItem('taken', JSON.stringify(takens));

    return { rightAnswer: answer, explanation };
  };

  return {
    getAnswer,
    id,
    options,
    problem,
    question,
  };
};

const getQuestions = async (): Promise<SecureQuestion[]> => {
  let taken = getTakens();
  taken = taken.filter(([ix, selected]) => selected !== null);

  const { default: questions }: { default: Question[] } = await import(`./questions/${CURRENT_LANGUAJE}.json`);

  if (taken.length + 10 >= questions.length) {
    taken = taken.slice(Math.floor(taken.length * .3))
  }

  const selectedQuestions = Array(10).fill(null).map(() => {
    const selectedIx = randomBetween(0, questions.length, taken.map(([ix]) => ix));
    taken.push([selectedIx, null, null]);

    return questions[selectedIx];
  });

  localStorage.setItem('taken', JSON.stringify(taken));

  try {
    return selectedQuestions.map(secureQuestion);
  } catch (error) {
    const newQuestions = await getQuestions();

    return newQuestions;
  }
};

export default getQuestions;

export const getAnswers = (): Answer[] => {
  const taken = getTakens();

  const lastResponses = taken.reverse().slice(0, 10).reverse();

  return lastResponses;
};
