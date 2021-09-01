import Option from '../option/option';
import './select.scss';

export default class Select {
  public readonly element: HTMLSelectElement;

  public option!: Option;

  constructor(
    tag: keyof HTMLElementTagNameMap = 'select',
    styles: string[] = [],
    name: string,
    id: string,
    required: string,
  ) {
    this.element = document.createElement(tag) as HTMLSelectElement;
    this.element.classList.add(...styles);
    this.element.setAttribute('name', name);
    this.element.setAttribute('id', id);
    this.element.setAttribute('required', required);
  }

  createOption(
    tag: keyof HTMLElementTagNameMap = 'option',
    value: string,
    info: string,
  ) {
    this.option = new Option(tag, value, info);
    this.element.append(this.option.element);
  }

  createDefaultOption(
    tag: keyof HTMLElementTagNameMap = 'option',
    value: string,
    info: string,
  ) {
    this.option = new Option(tag, value, info);
    this.option.element.setAttribute('selected', '');
    this.option.element.setAttribute('disabled', '');
    this.element.append(this.option.element);
  }
  
}
