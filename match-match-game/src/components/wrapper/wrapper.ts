import BaseComponent from '../base-component';
import Button from '../button/button';
import Nav from '../nav/nav';
import './wrapper.scss';

import userIcoDefault from '../../assets/profile.svg';

export default class Wrapper extends BaseComponent {
  public readonly nav: Nav;

  public readonly registerButton: Button = new Button(
    'register new player',
    'button',
    ['button'],
  );

  public readonly startGameButton: Button = new Button(
    'start game', 
    'button', 
    ['button'],
  );

  public readonly stopGameButton: Button = new Button(
    'stop game',
    'button', 
    ['button'],
  );

  public readonly userIco: BaseComponent = new BaseComponent('div', ['user-ico']);

  constructor() {
    super('div', ['wrapper']);
    this.element.innerHTML = `
        <div class="logo">
            <p class="logo__text">match</p>
            <p class="logo__text">match</p>
        </div>
      `;
    this.nav = new Nav();
    this.element.append(this.nav.element);
    this.element.append(this.registerButton.element);
  }

  createStartGameButton() {
    if (localStorage.getItem('userIco') !== null) {
      const src: string = localStorage.getItem('userIco') as string;
      this.userIco.element.setAttribute('style', `background-image: url(${src})`);
    } else {
      const src = userIcoDefault;
      this.userIco.element.setAttribute('style', `background-image: url(${src})`);
    }
    this.element.append(this.userIco.element);
    this.registerButton.element.replaceWith(this.startGameButton.element);
  }

  createStopGameButton() {
    this.startGameButton.element.replaceWith(this.stopGameButton.element);
  }

  removeStopGameButton() {
    this.stopGameButton.element.setAttribute('style', 'opacity: 0; pointer-events: none;');
  }
}
