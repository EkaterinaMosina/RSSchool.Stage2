import { cardsFieldListeners } from '../components/cardsField/handlers';
import { renderCardsField } from '../components/cardsField/index';
import { ADMIN_PANEL, ADMIN_PANEL_HUSH, ADMIN_WORDS_HUSH, CARDS_PAGE, DIFF_WORDS_PAGE_HUSH, MAIN_PAGE, MAIN_PAGE_HUSH, STATISTICS_PAGE, STATISTICS_PAGE_HUSH, WORDS } from '../components/constants';
import showDiffWordsPage from '../components/difficultWords/index';
import { renderSortedStatisticsPage, renderStatisticsPage } from '../components/statictics/index';
import statsListeners from '../components/statictics/handlers';
import renderTopics from '../components/topics/index';
import topicsListeners from '../components/topics/handlers';
import { makeNavElemActive, removeActiveNavElem } from '../utils/DOMutils';
import { showAdminPanel } from '../components/adminPanel/categoriesPage/index';
import { adminListeners } from '../components/adminPanel/categoriesPage/handlers';
import changeLocation from './changeLocation';
import { renderNavElIndex, renderPageAndTopic, renderSortAdnOrder } from './utils';
import { store } from '../redux/core/store';
import { showAdminWordsPage } from '../components/adminPanel/wordsPage/index';
import { wordsPageListeners } from '../components/adminPanel/wordsPage/handlers';
import { SECRET_FIELD } from './constants';
import { Config } from '../components/types';

const renderTopicsPage = () => {
  renderTopics();
  makeNavElemActive(0);
  topicsListeners();
};

const renderStatPage = () => {
  const navElementIndex = renderNavElIndex();
  makeNavElemActive(navElementIndex);
  renderStatisticsPage();
  statsListeners();
};

const renderDiffWordsPage = () => {
  removeActiveNavElem();
  showDiffWordsPage();
  cardsFieldListeners();
};

const renderAdminPanel = () => {
  if (localStorage.getItem(SECRET_FIELD)) {
    showAdminPanel();
    adminListeners();
  } else {
    changeLocation(MAIN_PAGE);
  }
}; 

const renderCardsPage = (location: string) => {
  const { cards } = store.getState();
  const { topic, page } = renderPageAndTopic(location);

  makeNavElemActive(page);
  renderCardsField(topic, cards[topic].words);
  cardsFieldListeners();
};

const ROUTER_CONFIG: Config = {
  [MAIN_PAGE_HUSH]: renderTopicsPage,
  [STATISTICS_PAGE_HUSH]: renderStatPage,
  [DIFF_WORDS_PAGE_HUSH]:  renderDiffWordsPage,
  [ADMIN_PANEL_HUSH]: renderAdminPanel,
  [CARDS_PAGE]: renderCardsPage,
  

};

const changeRout = (location: string) => {

  if (location.includes(CARDS_PAGE)) {
    const fn = ROUTER_CONFIG[CARDS_PAGE];
    fn(location);
    return;
  }

  if (location.includes(`${STATISTICS_PAGE}?`)) {

    const { sort, order } = renderSortAdnOrder(location);
    renderSortedStatisticsPage(sort, order);
    statsListeners();
    return;
  }

  if (location.includes(WORDS) && location !== ADMIN_WORDS_HUSH) {
    if (localStorage.getItem(SECRET_FIELD)) {
      showAdminWordsPage();
      wordsPageListeners();
    } else {
      changeLocation(MAIN_PAGE);
    }
    return;
  }

 
  const fn = ROUTER_CONFIG[location];
  fn();
  
};



export default function initRouter() {
  window.location.hash = MAIN_PAGE_HUSH;
  const mainLocation = window.location.hash;

  window.addEventListener('hashchange', () => {

    const location = window.location.hash;
    if (location === `#/${ADMIN_PANEL}/${WORDS}`) {
      window.location.hash = ADMIN_PANEL_HUSH;

    } else {
      changeRout(location);
    }
    
  });

  changeRout(mainLocation);
}


 