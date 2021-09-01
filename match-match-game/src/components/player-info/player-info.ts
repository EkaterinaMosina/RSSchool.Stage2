import BaseComponent from '../base-component';
import PlayerEmail from '../player-email/player-email';
import PlayerName from '../player-name/player-name';
import './player-info.scss';

export default class PlayerInfo extends BaseComponent {
  public readonly playerName: PlayerName;

  public readonly playerEmail: PlayerEmail;

  constructor(firstName: String, lastName: String, email: String) {
    super('div', ['player__info']);
    this.playerName = new PlayerName(firstName, lastName);
    this.element.append(this.playerName.element);
    this.playerEmail = new PlayerEmail(email);
    this.element.append(this.playerEmail.element);
  }
}
