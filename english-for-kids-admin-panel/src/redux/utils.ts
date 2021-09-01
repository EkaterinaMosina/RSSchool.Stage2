import { INIT_ITEM_MODE, WORDS } from '../components/constants';
import { Card, Cards } from '../components/types';
import { Statistics } from './core/types';

/* const cards = await getCardsApi(); */

export const getItems = (cards: Cards) => {

  const topics = Object.keys(cards);

  return topics.map(topic => 
    cards[topic][WORDS].map( (el: Card) =>[topic, el.word, el.translation]),
  );
}; 


export const renderStatisctics = (cards: Cards): Statistics | [] => {
  const items = getItems(cards);
  if (items.length === 0 ) { 
    return [];
  }
 
  const itemsDAta = items.reduce((acc, val) => acc.concat(val));
  
  return itemsDAta.reduce((acc: Statistics, [category, word, trans]) => {
    return {
      ...acc,
      [word]: {
        word,
        translation: trans,
        category,
        click: INIT_ITEM_MODE,
        guess: INIT_ITEM_MODE,
        mistakes: INIT_ITEM_MODE,
        persentage: INIT_ITEM_MODE,
      },
    };
  }, {});
};

