export default function randomBetween(min: number, max: number, ignore?: number | number[]): number {
  let random = Math.floor(Math.random() * (max - min + 1) + min);

  if (typeof ignore === 'undefined') {
    return random;
  } else if (typeof ignore === 'number') {
    while (random === ignore) {
      random = Math.floor(Math.random() * (max - min + 1) + min);
    }

    return random;
  } else if (ignore instanceof Array) {
    if (ignore.length === 0) {
      return random;
    }

    if (ignore.some((v) => typeof v !== 'number')) {
      throw new Error('Invalid operation');
    }

    while (ignore.indexOf(random) !== -1) {
      random = Math.floor(Math.random() * (max - min + 1) + min);
    }

    return random;
  }

  throw new Error('Invalid operation');
}
