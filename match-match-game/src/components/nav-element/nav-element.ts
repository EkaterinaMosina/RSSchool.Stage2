import BaseComponent from '../base-component';
import './nav-element.scss';

export default class NavElement extends BaseComponent {
  constructor(info: string) {
    super('a', ['nav__elem']);

    this.element.innerHTML = `
            <p class="info">${info}</p>
        `;
  }
}
