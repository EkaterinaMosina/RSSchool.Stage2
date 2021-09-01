import BaseComponent from '../base-component';
import Card from '../card/card';
import Constants from '../../constants';
import './cards-field.scss';




export default class CardsField extends BaseComponent {
  public readonly constants: Constants = new Constants();

  public cards: Card[] = [];

  constructor() {
    super('div', ['cards-field']);
  }

  clear() {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]) {
    this.cards = cards;
    this.cards.forEach((card) => this.element.append(card.element));
    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, this.constants.SHOW_TIME * 1000);
  }
}
