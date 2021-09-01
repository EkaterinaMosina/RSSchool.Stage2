import BaseComponent from '../base-component';
import Button from '../button/button';
import './congratulation.scss';

export default class Congratulation extends BaseComponent {
  public congratulationButton: Button = new Button('ok', 'button', ['congratulationButton']);

  constructor(min: string, sec: string, score: number) {
    super('div', ['congratulation']);
    this.element.innerHTML = `<p class="text"><big>Congratulations!</big><br>
                                You cope with this task in ${min}: ${sec} minuts.<br>
                                Your points are equal to ${score}.<br>
                                Сlick OK to view the table of records and find out your position.
                                </p>`;
    this.element.append(this.congratulationButton.element);
    this.congratulationButton.element.addEventListener('click', () => {
      window.location.hash = '/score';
    });
  }
}
