import BaseComponent from '../base-component';
import Label from '../label/label';
import Select from '../select/select';
import './game-settings.scss';

export default class GameSettings extends BaseComponent {
  public readonly label: Label;

  public readonly selectCard: Select;

  public readonly selectDifficulty: Select;

  constructor() {
    super('form', ['game-settings']);

    this.label = new Label('game-cards', 'Game cards');
    this.element.append(this.label.element);

    this.selectCard = new Select(
      'select',
      ['select'],
      'game-cards',
      'game-cards',
      'required',
    );
    this.selectCard.createDefaultOption('option', '0', 'select game cards type');
    this.selectCard.createOption('option', 'pets', 'pets');
    this.selectCard.createOption('option', 'summer', 'summer');
    this.element.append(this.selectCard.element);

    this.label = new Label('difficulty', 'Difficulty');
    this.element.append(this.label.element);

    this.selectDifficulty = new Select(
      'select',
      ['select'],
      'difficulty',
      'difficulty',
      'required',
    );
    this.selectDifficulty.createDefaultOption('option', '0', 'select game type');
    this.selectDifficulty.createOption('option', '8', '4*4');
    this.selectDifficulty.createOption('option', '18', '6*6');
    this.element.append(this.selectDifficulty.element);
  }
}
