import BaseComponent from '../base-component';
import './label.scss';

export default class Label extends BaseComponent {
  constructor(forElement: string, info: string) {
    super('label', ['label']);
    this.element.setAttribute('for', forElement);
    this.element.innerHTML = info;
  }
}
