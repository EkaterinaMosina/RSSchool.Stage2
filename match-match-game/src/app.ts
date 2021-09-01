import Header from './components/header/header';
import Main from './components/main/main';
import Registration from './components/registration/registration';

export default class App {
  private readonly rootElement: HTMLElement;

  public readonly header: Header;

  public readonly main: Main;

  public readonly registration: Registration;

  constructor(element: HTMLElement) {
    this.rootElement = element;
    this.header = new Header();
    this.rootElement.append(this.header.element);
    this.main = new Main();
    this.rootElement.append(this.main.element);
    this.registration = new Registration();
    this.rootElement.append(this.registration.element);
  }
}
