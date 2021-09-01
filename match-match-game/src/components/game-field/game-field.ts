import BaseComponent from '../base-component';
import CardsField from '../cards-field/cards-field';
import Timer from '../timer/timer';
import Card from '../card/card';
import './game-field.scss';
import { delay } from '../../shared/shared';
import Congratulation from '../congratulation/congratulation';
import Constants from '../../constants';
import Model from '../../model';

export const model: Model = new Model();

export class GameField extends BaseComponent {
  public readonly constants: Constants = new Constants();

  public readonly timer: Timer;

  public readonly cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation: Boolean = false;

  public congratulation!: Congratulation;

  private count!: number;

  private choice: number = 0;

  private incorrectChoice: number = 0;

  public score!: number;

  constructor() {
    super('div', ['game-field']);
    this.timer = new Timer();
    this.element.append(this.timer.element);
    this.cardsField = new CardsField();
    this.element.append(this.cardsField.element);
  }

  showCongratulation(min: string, sec: string, score: number) {
    this.congratulation = new Congratulation(min, sec, score);
    this.element.append(this.congratulation.element);
  }

  addUserToDB() {
    const userFirstName = localStorage.getItem('userFirstName');
    const userLastName = localStorage.getItem('userLastName');
    const userEmail = localStorage.getItem('userEmail');
    const userIco = localStorage.getItem('userIco');
    if (userFirstName !== null && userLastName !== null && userEmail !== null) {
      model.addUserToDB(
        'users',
        userIco,
        userFirstName,
        userLastName,
        userEmail,
        this.score,
      );
    }
  }

  newGame(images: string[]) {
    this.cardsField.clear();
    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);
    this.count = cards.length;
    cards.forEach((card) => card.element.addEventListener('click', () => this.cardHandler(card)));
    this.cardsField.addCards(cards);
    this.timer.startTimer();
  }

  calcScore(choice: number, incorrectChoice: number, min: string, sec: string) {
    const minuts = +min;
    const seconds = +sec;
    const time = minuts * 60 + seconds;
    this.score = (choice - incorrectChoice) * 100 - time * 10;
    if (this.score < 0) this.score = 0;
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;

    card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }
    if (this.activeCard) {
      this.choice += 1;
      if (this.activeCard.image !== card.image) {
        this.incorrectChoice += 1;
        await delay(this.constants.RESULT_DELAY);
        this.activeCard.showIncorrectChoice();
        card.showIncorrectChoice();
        await delay(this.constants.RESULT_DELAY);
        await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
      } else {
        await delay(this.constants.RESULT_DELAY);
        this.activeCard.showCorrectChoice();
        card.showCorrectChoice();
        this.count -= 2;
        if (this.count === 0) {
          this.timer.stopTimer();
          this.calcScore(
            this.choice,
            this.incorrectChoice,
            this.timer.min,
            this.timer.sec,
          );
          await delay(this.constants.RESULT_DELAY);
          this.addUserToDB();
          this.showCongratulation(this.timer.min, this.timer.sec, this.score);
          
        }
      }
    }
    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
