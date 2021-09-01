import Main from './components/main/main';
import Nav from './components/nav/nav';

export default class Router {
  changeLocation(location: string, field: Main, nav: Nav) {
    switch (location) {
      case '#/about':
        field.createAboutPage();
        nav.removeActiveNavElement();
        nav.makeNavElementActive(0);
        break;

      case '#/game':
        break;

      case '#/settings':
        field.createGameSettingsPage();
        nav.removeActiveNavElement();
        nav.makeNavElementActive(2);
        break;

      case '#/score':
        field.createBestScorePage();
        nav.removeActiveNavElement();
        nav.makeNavElementActive(1);
        break;

      default:
        field.createAboutPage();
        nav.removeActiveNavElement();
        nav.makeNavElementActive(0);
        break;
    }
  }
}
