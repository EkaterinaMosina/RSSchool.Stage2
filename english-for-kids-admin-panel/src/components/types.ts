import { StatData } from '../redux/core/types';

export interface Cards {
  [key: string]: CategoryData;
}

export interface CategoryData {
  image: string | ArrayBuffer,
  words: Card[]
}

export interface Card {
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
}

export interface Params {
  statData: StatData[],
  sort: string,
  order: string
}

export interface Config {
  [key: string]: Function
}

export interface Data {
  [key: string]: string
}