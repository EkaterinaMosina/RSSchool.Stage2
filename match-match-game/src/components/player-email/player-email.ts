import BaseComponent from '../base-component';
import './player-email.scss';

export default class PlayerEmail extends BaseComponent {
  constructor(email: String) {
    super('div', ['player__email']);
    this.element.innerHTML = `${email}`;
  }
}
