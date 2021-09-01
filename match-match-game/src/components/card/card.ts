import BaseComponent from '../base-component';
import './card.scss';
import Constants from '../../constants';
import { removeClass } from '../../shared/shared';

export default class Card extends BaseComponent {
  isFlipped = false;

  isCorrect = false;

  public readonly constants: Constants = new Constants();

  constructor(readonly image: string) {
    super('div', ['card-container']);
    this.element.innerHTML = `
            <div class="card">
                <div class="card__front" style="background-image: url('${image}')"></div>
                <div class="card__back"></div>
            </div>
        `;
  }

  flipToBack() {
    this.isFlipped = true;
    this.element.classList.add(this.constants.FLIP_CLASS);
    removeClass(this.element, this.constants.INCORRECT);
  }

  flipToFront() {
    this.isFlipped = false;
    this.element.classList.remove(this.constants.FLIP_CLASS);
  }

  showCorrectChoice() {
    removeClass(this.element, this.constants.INCORRECT);
    this.element.classList.add(this.constants.CORRECT);
    this.isCorrect = true;
  }

  showIncorrectChoice() {
    this.element.classList.add(this.constants.INCORRECT);
  }
}
