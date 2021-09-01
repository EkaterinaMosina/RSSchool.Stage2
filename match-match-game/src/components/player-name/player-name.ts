import BaseComponent from '../base-component';
import './player-name.scss';

export default class PlayerName extends BaseComponent {
  constructor(firstName: String, lastName: String) {
    super('div', ['player__name']);
    this.element.innerHTML = `${firstName} ${lastName}`;
  }
}
