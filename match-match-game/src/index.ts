import './styles.scss';
import Controller from './controller';

window.onload = () => {
  if (localStorage.getItem('userFirstName')) {
    localStorage.clear();
  }
  const controller = new Controller();
  if (!controller) throw new Error('Oops, there is no controller');
};


