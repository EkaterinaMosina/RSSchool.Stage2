import BaseComponent from '../base-component';
import NavElement from '../nav-element/nav-element';
import './nav.scss';

export default class Nav extends BaseComponent {
  public readonly navElement: NavElement;

  public readonly navElements: HTMLElement[];

  public readonly navLinks: string[] = ['about', 'score', 'settings'];

  constructor() {
    super('nav', ['nav']);
    this.navElements = [];

    this.navElement = new NavElement('About Game');
    this.navElement.element.classList.add('active');
    this.element.append(this.navElement.element);
    this.navElements.push(this.navElement.element);

    this.navElement = new NavElement('Best score');
    this.element.append(this.navElement.element);
    this.navElements.push(this.navElement.element);

    this.navElement = new NavElement('Game Settings');
    this.element.append(this.navElement.element);
    this.navElements.push(this.navElement.element);
  }

  removeActiveNavElement() {
    this.navElements.forEach((elem) => {
      if (elem.classList.contains('active')) {
        elem.classList.remove('active');
      }
    });
  }

  makeNavElementActive(index: number) {
    this.navElements[index].classList.add('active');
  }
}
