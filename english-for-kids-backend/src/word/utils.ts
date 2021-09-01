import { Card } from '../category/types';
import { WORDS } from './repository';

export const findCategory = (word: string) => {
  const keys = Object.keys(WORDS);
  return keys.find(category => (WORDS[category].find(card => card.word === word)));
};

export const findWord = (words: Card[], word: string) => {
  return words.find(el=>el.word === word);
};
