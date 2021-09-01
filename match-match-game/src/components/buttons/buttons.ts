import BaseComponent from '../base-component';
import Button from '../button/button';
import './buttons.scss';
import Constants from '../../constants';
import { removeClass } from '../../shared/shared';

export default class Buttons extends BaseComponent {
  public readonly constants: Constants = new Constants;

  public readonly buttonSubmit: Button;

  public readonly buttonCansel: Button;

  constructor() {
    super('div', ['buttons']);

    this.buttonSubmit = new Button('ADD USER', 'input', ['button_submit', 'button']);
    this.buttonSubmit.addAttributes('ADD USER', 'button');
    this.element.append(this.buttonSubmit.element);

    this.buttonCansel = new Button('CANSEL', 'input', ['button_reset', 'button']);
    this.buttonCansel.addAttributes('CANSEL', 'reset');
    this.element.append(this.buttonCansel.element);
  }

  allowAddUser() {
    removeClass(this.buttonSubmit.element, this.constants.FORBIDDEN);
    this.buttonSubmit.element.classList.add(this.constants.ALLOWED);
  }

  forbidAddUser() {
    removeClass(this.buttonSubmit.element, this.constants.ALLOWED);
    this.buttonSubmit.element.classList.add(this.constants.FORBIDDEN);
  }
}
