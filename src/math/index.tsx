export type DiceType = 4 | 6 | 8 | 10 | 12 | 20;

export function clamp(min: number, max: number, value: number): number {
  return Math.min(max, Math.max(min, value));
}

export function roll(diceType: DiceType): number {
  const result = Math.random() * (diceType + 1);
  return clamp(1, diceType, Math.floor(result));
}
