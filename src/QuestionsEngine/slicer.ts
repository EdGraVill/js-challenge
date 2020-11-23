import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import md5 from 'md5';
import content from '../questions.json';
import { randomBetween } from '../util';

export interface Result {
  finished: string;
  hash: string;
  id: number;
  right: number;
  selected: number;
  started: string;
}

export interface Entry {
  sessionDetails: {
    finished: string;
    locale: string;
    name: string;
    started: string;
  };
  results: Result[];
}

export const getQuestionsInitialState = () => ({
  currentStart: null as string | null,
  questionsId: [] as number[],
  questionIx: 0,
  results: [] as Result[],
  sessionDetails: {
    finished: null as string | null,
    isActive: false,
    locale: 'en-EN',
    name: '',
    started: null as string | null,
  },
  history: [] as readonly Entry[],
});

export type QuestionsState = ReturnType<typeof getQuestionsInitialState>;

const getRandomQuestionId = (state: QuestionsState): number => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const questionsCountForLocale = content.find((questions) => questions.locale === state.sessionDetails.locale)!.list
    .length;

  const alreadyTaken = [
    // avoid repeat same at session
    ...state.results.map(({ id }) => id),
    // avoid repeat last questions asked
    ...state.history
      .filter(
        ({ sessionDetails }, ix) =>
          // avoid first 60%
          ix < Math.floor(questionsCountForLocale * 0.6) &&
          // avoid only with the same name (If change name, can appear repeated questions)
          sessionDetails.name === state.sessionDetails.name &&
          // avoid only with the same locale (If change locale, can appear repeated questions)
          sessionDetails.locale === state.sessionDetails.locale,
      )
      .reduce((prev, curr) => [...prev, ...curr.results.map(({ id }) => id)], [] as number[]),
  ];

  return randomBetween(0, questionsCountForLocale, alreadyTaken);
};

export const { actions: questionsActions, reducer: questionsReducer, name: questionsReducerName } = createSlice({
  initialState: getQuestionsInitialState(),
  name: 'questions',
  reducers: {
    start: {
      prepare(locale: string, name: string) {
        return { payload: [name, locale] } as PayloadAction<[string, string]>;
      },
      reducer(state, { payload: [name, locale] }: PayloadAction<[string, string]>) {
        const started = new Date().toISOString();

        state.sessionDetails = {
          finished: null,
          isActive: true,
          locale,
          name,
          started,
        };

        const initialQuestionId = getRandomQuestionId(state);

        state.currentStart = started;
        state.questionsId = [initialQuestionId];
        state.questionIx = 0;
      },
    },
    answer(state, { payload }: PayloadAction<number>) {
      if (state.results.length === 10) {
        return state;
      }

      if (state.questionsId.length === 10) {
        state.sessionDetails.isActive = false;
      }

      const now = new Date().toISOString();

      const result: Omit<Result, 'hash'> = {
        finished: now,
        id: state.questionsId[state.questionIx],
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        right: content
          .find(({ locale }) => locale === state.sessionDetails.locale)!
          .list.find(({ id }) => id === state.questionsId[state.questionIx])!.answer,
        selected: payload,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        started: state.currentStart!,
      };

      state.currentStart = null;

      const hash = state.results.length
        ? md5(`${state.results[state.results.length - 1].hash}${JSON.stringify(result)}`)
        : md5(JSON.stringify(result));

      state.results.push({
        ...result,
        hash,
      });

      if (state.results.length === 10) {
        state.sessionDetails.finished = new Date().toISOString();
        state.sessionDetails.isActive = false;

        state.history.push({
          results: state.results,
          sessionDetails: {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            finished: state.sessionDetails.finished!,
            locale: state.sessionDetails.locale,
            name: state.sessionDetails.name,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            started: state.sessionDetails.started!,
          },
        });
      }
    },
    goNextQuestion(state) {
      if (state.questionIx === state.results.length || state.questionIx === 10) {
        return state;
      }

      const isNew = state.questionIx === state.questionsId.length - 1;
      const isLast = state.questionsId.length === 10;

      if (isNew && !isLast) {
        const nextQuestionId = getRandomQuestionId(state);

        state.currentStart = new Date().toISOString();
        state.questionsId.push(nextQuestionId);
      }

      state.questionIx += 1;
    },
    goPrevQuestion(state) {
      if (state.questionIx === 0) {
        return state;
      }

      state.questionIx -= 1;
    },
    goNQuestion(state, { payload }: PayloadAction<number>) {
      if (payload < 0 || payload > 10 || payload > state.questionsId.length) {
        return state;
      }

      state.questionIx = payload;
    },
    newChallenge(state) {
      const initialState = getQuestionsInitialState();

      return {
        ...initialState,
        history: state.history,
        sessionDetails: {
          ...initialState.sessionDetails,
          locale: state.sessionDetails.locale,
          name: state.sessionDetails.name,
        },
      };
    },
    // ONLY FOR DEV
    setCurrentQuestionId(state, { payload }: PayloadAction<number>) {
      if (process.env.NODE_ENV === 'production') {
        return state;
      }

      state.questionsId[state.questionIx] = payload;
    },
    restartTimer(state) {
      if (process.env.NODE_ENV === 'production') {
        return state;
      }

      state.currentStart = new Date().toISOString();
    },
  },
});
