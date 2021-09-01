import BaseComponent from '../base-component';
import './player-score.scss';

export default class PlayerScore extends BaseComponent {
  constructor(score: Number) {
    super('div', ['player__score']);
    this.element.innerHTML = `Score: ${score}`;
  }
}
