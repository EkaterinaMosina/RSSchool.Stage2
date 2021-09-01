import BaseComponent from '../base-component';

import './button.scss';

export default class Button extends BaseComponent {
  constructor(
    info: string,
    tag: keyof HTMLElementTagNameMap,
    styles: string[] = [],
  ) {
    super(tag);
    this.element.classList.add(...styles);
    this.element.innerHTML = info;
  }

  addAttributes(value: string, type: string) {
    this.element.setAttribute('value', value);
    this.element.setAttribute('type', type);
  }

  changeInnerText(text: string) {
    this.element.innerHTML = text;
  }
}
