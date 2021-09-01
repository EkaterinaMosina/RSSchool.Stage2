import BaseComponent from '../base-component';
import './timer.scss';

export default class Timer extends BaseComponent {
  public min!: string;

  public sec!: string;

  public setInterval!: ReturnType<typeof setInterval>;

  constructor() {
    super('p', ['timer']);
    this.initTimer();
  }

  initTimer() {
    this.min = '00';
    this.sec = '00';
    this.element.innerHTML = `${this.min}:${this.sec}`;
  }

  startTimer() {
    let sec = 0;
    let min = 0;
    this.setInterval = setInterval(() => {
      sec += 1;
      this.sec = sec < 10 ? `0${sec}` : sec.toString();
      if (sec === 60) {
        this.sec = '00';
        sec = 0;
        min += 1;
        this.min = `0${min}`;
      }
      this.element.innerHTML = `${this.min}:${this.sec}`;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.setInterval);
  }
}
