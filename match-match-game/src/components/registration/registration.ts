import BaseComponent from '../base-component';
import RegWrapper from '../reg-wrapper/reg-wrapper';

import './registration.scss';

export default class Registration extends BaseComponent {
  public readonly regWrapper: RegWrapper;

  constructor() {
    super('form', ['registration']);
    this.regWrapper = new RegWrapper();
    this.element.append(this.regWrapper.element);
  }

  openRegistForm(): void {
    this.element.className = 'registration-opened';
  }

  closeRegistForm(): void {
    this.element.className = 'registration';
  }
}
