import { cardsFieldListeners } from '../components/cardsField/handlers';
import { renderCardsField } from '../components/cardsField/index';
import {
  CARDS_PAGE,
  DIFF_WORDS_PAGE_HUSH,
  MAIN,
  WORDS,
} from '../components/constants';
import showDiffWordsPage from '../components/difficultWords/index';
import { store } from '../redux/core/store';
import { renderElement } from './render';

export const appendContent = (content: string) => {
  const rootMainElement = renderElement(MAIN);
  rootMainElement.innerHTML = content;
};

export const checkPage = () => {
  const page = window.location.hash;
  
  if (page.includes(CARDS_PAGE) || page === DIFF_WORDS_PAGE_HUSH) {

    const { topic, cards } = store.getState();

    if (page.includes(CARDS_PAGE)) {
      renderCardsField(topic, cards[topic][WORDS]);
    }
    if (page === DIFF_WORDS_PAGE_HUSH) {
      showDiffWordsPage();
    }
    cardsFieldListeners();
  } 
};

export const renderNavList = ():string[][] => {
  const { cards } = store.getState();
  const topics = Object.keys(cards);
  const topicsList = topics.map( (topic, index)=>[`cards-${index + 1}`, topic]);

  if (localStorage.getItem('katundra')) {
    return [['main', 'Main page'],
      ...topicsList,
      ['statistics', 'Statistics'],
      ['admin', 'Admin']];
  } 
  return [['main', 'Main page'],
    ...topicsList,
    ['statistics', 'Statistics'],
    ['login', 'Log In']]; 
};