import BaseComponent from '../base-component';
import './game-rules.scss';

export default class GameRules extends BaseComponent {
  constructor() {
    super('div', ['game-rules']);
    this.element.innerHTML = `
        <h2 class="cap">How to play?</h2>
            <div class="rules">
                <div class="rules__item">
                  <div class="rules__number">1</div>
                  <p class="rules__info">Register new player in game</p>
                  <div class="rules__example" alt=""></div>
                </div>
                <div class="rules__item">
                  <div class="rules__number">2</div>
                  <p class="rules__info">Configure your game settings</p>
                  <div class="rules__example" alt=""></div>
                </div>
                <div class="rules__item">
                  <div class="rules__number">3</div>
                  <p class="rules__info">Start you new game! Remember card positions and match it before times up.</p>
                  <div class="rules__example" alt=""></div>
                </div>
            </div>
        `;
  }
}
