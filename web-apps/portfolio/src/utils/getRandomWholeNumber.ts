export function getRandomWholeNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}
