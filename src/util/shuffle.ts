function xorshift(seed: number): [number, number] {
  // Xorshift algorithm
  seed ^= seed << 13;
  seed ^= seed >> 17;
  seed ^= seed << 5;
  const nextSeed = seed < 0 ? 1.0 + seed / 2147483648 : seed / 2147483647;
  return [nextSeed, seed];
}

export default function shuffle<T>(array: T[], seed: number): T[] {
  const arr = [...array];
  let currentSeed = seed;

  for (let i = arr.length - 1; i > 0; i--) {
    let rand: number;
    [rand, currentSeed] = xorshift(currentSeed);
    const j = Math.floor(rand * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}
