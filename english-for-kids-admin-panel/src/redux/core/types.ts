import { Cards } from '../../components/types';

export interface Action {
  type: string;
  payload: Payload
}

export interface CardActionData {
  key: string;
  data: StatData
}

export interface State {
  mode: string;
  topic: string;
  statistics: Statistics;
  adminTopic: string;
  adminMode: string;
  cards: Cards
}

export interface Store {
  dispatch(): void;
  subscribe(): void;
  getState(): State;
}

export interface Statistics {
  [key: string]: StatData
}

export interface Payload {
  mode?: string;
  topic?: string;
  statData?: Statistics;
  key?: string;
  data?: StatData;
  adminTopic?: string;
  adminMode?: string;
  cards?: Cards
}

export interface StatData {
  word: string,
  translation: string,
  category: string,
  click: number,
  guess: number,
  mistakes: number,
  persentage: number,
  [key: string]: string | number
}