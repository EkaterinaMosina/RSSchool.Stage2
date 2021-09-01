import { CardActionData, Statistics } from '../core/types';
import { store } from '../core/store';
import { SELECT_TOPIC, CHANGE_MODE, ADD_CARD_ACTION, ADD_STATISTICS, SELECT_ADMIN_TOPIC, SELECT_ADMIN_MODE, UPDATE_CARDS } from './actionTypes';
import { Cards } from '../../components/types';

export const selectTopic = (topic: string) => {
  store.dispatch({
    type: SELECT_TOPIC,
    payload: { topic },
  });
};

export const changeMode = (mode: string) => {
  store.dispatch({
    type: CHANGE_MODE,
    payload: { mode },
  });
};

export const addCardAction = ( cardActionData : CardActionData) => {
  store.dispatch({
    type: ADD_CARD_ACTION,
    payload: cardActionData,
  });
};

export const addStatisctics = (statData: Statistics) => {
  store.dispatch({
    type: ADD_STATISTICS,
    payload: { statData },
  });
};

export const selectAdminTopic = (adminTopic: string) => {
  store.dispatch({
    type: SELECT_ADMIN_TOPIC,
    payload: { adminTopic },
  });
};

export const selectAdminMode = (adminMode: string) => {
  store.dispatch({
    type: SELECT_ADMIN_MODE,
    payload: { adminMode },
  });
};

export const updateCards = (cards: Cards) => {
  store.dispatch({
    type: UPDATE_CARDS,
    payload: { cards },
  });
};