import BaseComponent from '../base-component';
import ScoreWrapper from '../score-wrapper/score-wrapper';
import './score.scss';
import { model } from '../game-field/game-field';

interface User {
  userIco: string | null;
  firstName: string;
  lastName: string;
  email: string;
  score: number;
}

export default class Score extends BaseComponent {
  public readonly scoreWrapper: ScoreWrapper;

  public users!: User[];

  constructor() {
    super('div', ['best-players']);
    this.element.innerHTML = '<h2 class="cap">Best players</h2>';
    this.scoreWrapper = new ScoreWrapper();
    this.element.append(this.scoreWrapper.element);
    if (model.db) {
      model.getUsersFromDB('users').then((result) => {
        this.users = result as User[];
        this.users.sort((a, b) => a.score > b.score ? 1 : -1);
        this.users.reverse();
        this.createScoreTable(this.users);
      });
    }
  }

  createScoreTable(users: User[]) {
    for (let i = 0; i < 10; i += 1) {
      if (users[i]) {
        const { userIco, firstName, lastName, email, score } = users[i];
        this.scoreWrapper.showUserInScore(
          userIco,
          firstName,
          lastName,
          email,
          score,
        );
      }
        
    }
  }
}
