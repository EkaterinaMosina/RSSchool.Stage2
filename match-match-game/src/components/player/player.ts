import BaseComponent from '../base-component';
import PlayerInfo from '../player-info/player-info';
import PlayerScore from '../player-score/player-score';
import './player.scss';
import url from '../../assets/profile.svg';

export default class Player extends BaseComponent {
  public readonly playerInfo: PlayerInfo;

  public readonly playerScore: PlayerScore;

  public readonly playerIco: BaseComponent = new BaseComponent('div', ['player__ico']);

  constructor(
    ico: string | null,
    firstName: string,
    lastName: string,
    email: string,
    score: number,
  ) {
    super('div', ['player']);
    (ico === null) ? (
      this.playerIco.element.setAttribute('style', `background-image: url(${url})`)
    ) : (
      this.playerIco.element.setAttribute('style', `background-image: url(${ico})`)
    );
    this.element.append(this.playerIco.element);
    this.playerInfo = new PlayerInfo(firstName, lastName, email);
    this.element.append(this.playerInfo.element);
    this.playerScore = new PlayerScore(score);
    this.element.append(this.playerScore.element);
  }
}
