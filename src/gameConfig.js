import { Rabbit, Shield, Skull } from 'lucide-react';

export const LEVELS = [
  { key: 'easy', label: 'Easy', icon: Rabbit, turns: Infinity, tone: 'green' },
  { key: 'normal', label: 'Normal', icon: Shield, turns: 10, tone: 'blue' },
  { key: 'hard', label: 'Hard', icon: Skull, turns: 5, tone: 'red' },
];

export const INTERVALS = [10, 100, 500, 1000];

export const DEFAULT_LEVEL = LEVELS[0].key;
export const DEFAULT_INTERVAL = INTERVALS[0];

export function getLevelConfig(levelKey) {
  return LEVELS.find((level) => level.key === levelKey) ?? LEVELS[0];
}

export function getTurnsLabel(turns) {
  return Number.isFinite(turns) ? String(turns) : '∞';
}

export function pickRandomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}
