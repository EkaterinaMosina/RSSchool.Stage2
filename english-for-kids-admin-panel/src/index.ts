import './styles.scss';
import initApp from './components/app/initApp';
import headerListeners from './components/header/handlers';
import initRouter from './router/index';
import { checkPage } from './utils/index';
import { store } from './redux/core/store';
import { initStatistics, saveStatistics } from './components/statictics/utils';
import { updateAdminPage } from './components/adminPanel/utils';
  
initApp();
headerListeners();
initRouter();
initStatistics();

const { mode: prevMode, cards: prevCards } = store.getState(); 
const INIT_STATE_APP = {
  prevMode,
  prevCards,
};

store.subscribe(() => {
  const { mode, cards } = store.getState();

  if (mode !== INIT_STATE_APP.prevMode) {
    checkPage();
    INIT_STATE_APP.prevMode = mode;
  }

  if (INIT_STATE_APP.prevCards !== cards) {
    
    updateAdminPage(cards);
    INIT_STATE_APP.prevCards = cards;

  }
}); 

window.addEventListener('unload', () => 
  saveStatistics(),
);



