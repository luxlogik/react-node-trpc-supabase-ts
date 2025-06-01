export function randomNumberInRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function randomNumberInRangeInt(min: number, max: number) {
  return Math.floor(randomNumberInRange(min, max));
}
