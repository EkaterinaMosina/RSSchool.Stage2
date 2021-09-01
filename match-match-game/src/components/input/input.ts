import './input.scss';

export default class Input {
  public element: HTMLInputElement;

  constructor(
    tag: keyof HTMLElementTagNameMap = 'input',
    styles: string[] = [],
    id: string,
    type: string,
    required: string,
  ) {
    this.element = document.createElement(tag) as HTMLInputElement;
    this.element.classList.add(...styles);
    this.element.setAttribute('id', id);
    this.element.setAttribute('type', type);
    this.element.setAttribute('required', required);
  }
}
