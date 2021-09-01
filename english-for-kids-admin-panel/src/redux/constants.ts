import { getCardsApi } from '../api/index';
import { renderStatisctics } from './utils';


const cards = await getCardsApi();

export const PLAY_MODE = 'play';
export const TRAIN_MODE = 'train';
export const INIT_STATE_STATISTICS = renderStatisctics(cards);

export const INIT_STATE_STORE = {
  mode: TRAIN_MODE,
  topic: '',
  statistics: INIT_STATE_STATISTICS,
  adminTopic: '',
  adminMode: '',
  cards,
};





