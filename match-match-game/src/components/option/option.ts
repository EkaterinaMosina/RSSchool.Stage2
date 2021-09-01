export default class Option {
  public readonly element: HTMLOptionElement;

  constructor(
    tag: keyof HTMLElementTagNameMap = 'option',
    value: string,
    info: string,
  ) {
    this.element = document.createElement(tag) as HTMLOptionElement;
    this.element.setAttribute('value', value);
    this.element.innerHTML = info;
  }
}
