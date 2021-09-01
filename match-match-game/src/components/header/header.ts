import './header.scss';
import BaseComponent from '../base-component';
import Wrapper from '../wrapper/wrapper';

export default class Header extends BaseComponent {
  public readonly wrapper: Wrapper;

  constructor() {
    super('header', ['header']);
    this.wrapper = new Wrapper();
    this.element.append(this.wrapper.element);
  }
}
