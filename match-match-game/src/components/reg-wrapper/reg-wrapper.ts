import BaseComponent from '../base-component';
import Buttons from '../buttons/buttons';
import Form from '../form/form';

import './reg-wrapper.scss';

export default class RegWrapper extends BaseComponent {
  public readonly form: Form;

  public readonly buttons: Buttons;

  constructor() {
    super('div', ['registration__wrapper']);
    this.element.innerHTML = '<h2 class="cap">Register new Player</h2>';
    this.form = new Form();
    this.element.append(this.form.element);
    this.buttons = new Buttons();
    this.element.append(this.buttons.element);
    this.form.element.addEventListener('submit', (e) => e.preventDefault());
  }
}
