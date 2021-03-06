import { themeObject } from './theme';

export const randomBetween = (min: number, max: number, ignore?: number | number[]): number => {
  let random = Math.floor(Math.random() * (max - min + 1) + min);

  if (typeof ignore === 'undefined' || (ignore instanceof Array && !ignore.length)) {
    return random;
  } else if (typeof ignore === 'number') {
    while (random === ignore) {
      random = Math.floor(Math.random() * (max - min + 1) + min);
    }

    return random;
  } else if (ignore instanceof Array && typeof ignore[0] === 'number') {
    while (ignore.indexOf(random) !== -1) {
      random = Math.floor(Math.random() * (max - min + 1) + min);
    }

    return random;
  }

  throw new Error(`Invalid operation:\n\n${JSON.stringify({ min, max, ignore }, undefined, 2)}`);
};

export const getDefaultTheme = (): keyof typeof themeObject =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const capitalize = (text: string, capitalizeEveryWord = false): string => {
  if (capitalizeEveryWord) {
    return text
      .split(' ')
      .map((word) => capitalize(word))
      .join(' ');
  }

  const [firstLetter, ...rest] = text;

  return `${firstLetter.toUpperCase()}${rest.join('')}`;
};
