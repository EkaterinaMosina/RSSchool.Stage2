import BaseComponent from '../base-component';
import GameRules from '../game-rules/game-rules';
import GameSettings from '../game-settings/game-settings';
import Score from '../score/score';
import './main.scss';
import { GameField } from '../game-field/game-field';
import Constants from '../../constants';
import { removeClass } from '../../shared/shared';

export default class Main extends BaseComponent {
  public gameRules: GameRules = new GameRules();

  public gameSettings: GameSettings = new GameSettings();

  public score!: Score;

  public gameField: GameField = new GameField();

  public readonly constants: Constants = new Constants();

  constructor() {
    super('div', ['main']);
    this.element.append(this.gameRules.element);
  }

  async startGame(type: string, difficulty: string) {
    const images = type === 'pets' ? this.constants.PETS_IMAGES : this.constants.SUMMER_IMAGES;
    images.sort(() => Math.random() - 0.5);
    this.checkDifficulty();
    let gameImages: string[];
    (difficulty === '18') ? (
      gameImages = images,
      this.gameField.cardsField.element.classList.add(this.constants.HARD_GAME)
    ) : (
      gameImages = images.slice(0, 8),
      this.gameField.cardsField.element.classList.add(this.constants.SIMPLE_GAME)
    );

    this.gameField.newGame(gameImages);
  }

  createAboutPage() {
    this.element.innerHTML = '';
    this.element.append(this.gameRules.element);
  }

  createGameSettingsPage() {
    this.element.innerHTML = '';
    this.element.append(this.gameSettings.element);
  }

  createBestScorePage() {
    this.element.innerHTML = '';
    this.score = new Score();
    this.element.append(this.score.element);
  }

  createGamePage(type: string, difficulty: string) {
    this.element.innerHTML = '';
    this.startGame(type, difficulty);
    this.element.append(this.gameField.element);
  }

  checkDifficulty() {
    removeClass(this.gameField.cardsField.element, this.constants.SIMPLE_GAME);
    removeClass(this.gameField.cardsField.element, this.constants.HARD_GAME);
  }
}
