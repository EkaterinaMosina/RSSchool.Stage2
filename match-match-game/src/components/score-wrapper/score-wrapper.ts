import BaseComponent from '../base-component';
import Player from '../player/player';
import './score-wrapper.scss';

export default class ScoreWrapper extends BaseComponent {
  public player!: Player;

  constructor() {
    super('div', ['best-players__wrapper']);
  }

  showUserInScore(
    ico: string | null,
    firstName: string,
    lastName: string,
    email: string,
    score: number,
  ) {
    this.player = new Player(ico, firstName, lastName, email, score);
    this.element.append(this.player.element);
  }
}
