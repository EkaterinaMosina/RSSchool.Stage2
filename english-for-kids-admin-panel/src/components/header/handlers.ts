import { ADMIN_PAGE, APP, CARDS_PAGE, LOGIN_PAGE, MENU, NAV, NAV_ELEM, STATISTICS_PAGE, STAT_LOGO, SWITCH } from '../constants';
import changeLocation from '../../router/changeLocation';
import { toggleActiveView, changeAppView } from '../../utils/DOMutils';
import { changeMode, selectTopic } from '../../redux/actions/index';
import { PLAY_MODE, TRAIN_MODE } from '../../redux/constants';
import { store } from '../../redux/core/store';
import { showLoginForm } from '../registrForm/index';
import { renderElement, renderElements } from '../../utils/render';
import { renderNavList } from '../../utils/index';
import { ADMIN } from '../../api/constants';

export default function headerListeners() {
  const app = renderElement(APP);
  const switchInput = renderElement(SWITCH, app);
  const menu = renderElement(MENU, app);
  const nav = renderElement(NAV, app);
  const navElements = renderElements(NAV_ELEM, app);
  const statsLogo = renderElement(STAT_LOGO, app);

  switchInput.addEventListener('change', () => {
    const { mode } = store.getState();
    const newMode = (mode === PLAY_MODE) ? TRAIN_MODE : PLAY_MODE;
   
    changeMode(newMode);
    changeAppView(newMode, mode); 
  });

  menu.addEventListener('click', () => toggleActiveView(menu, nav));
  nav.addEventListener('click', () => toggleActiveView(menu, nav));

  statsLogo.addEventListener('click', () => {
    changeLocation(STATISTICS_PAGE);
    selectTopic('');
  });

  navElements.forEach((el, index) => {
    const navElem = el as HTMLElement;

    navElem.addEventListener('click', () => {
      const navList = renderNavList();
      const [page, topic] = navList[index];

      if (page === LOGIN_PAGE) {
        showLoginForm();
      } else if (page === ADMIN) {
        changeLocation(ADMIN_PAGE);
      } else {
        if (page.includes(CARDS_PAGE)) {
          selectTopic(topic);
        } 
        changeLocation(page);
      }
      
    });
  });
}
