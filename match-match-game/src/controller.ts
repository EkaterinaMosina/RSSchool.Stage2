import App from './app';
import Router from './router';
import Validation from './validation';
import Constants from './constants';
import { removeClass } from './shared/shared';

export default class Controller {
  public readonly app: App = new App(document.body);

  public readonly router: Router = new Router();

  public readonly validation: Validation = new Validation();

  public readonly constants: Constants = new Constants();

  public type!: string;

  public difficulty!: string;

  constructor() {
    const registButton = this.app.header.wrapper.registerButton.element;
    const registrationShadow = this.app.registration.element;
    const { inputs } = this.app.registration.regWrapper.form.formFields;
    const startGameButton = this.app.header.wrapper.startGameButton.element;
    const stopGameButton = this.app.header.wrapper.stopGameButton.element;
    const selectCardType = this.app.main.gameSettings.selectCard.element;
    const selectDifficulty =
      this.app.main.gameSettings.selectDifficulty.element;
    const submitUserButton =
      this.app.registration.regWrapper.buttons.buttonSubmit.element;
    const clearRegistrFormButton =
      this.app.registration.regWrapper.buttons.buttonCansel.element;

    submitUserButton.addEventListener('click', () => {
      (submitUserButton.classList.contains('allowed')) ? (
        this.closeRegistationForm(),
        this.app.header.wrapper.createStartGameButton()
      ) : (
        inputs.forEach((el) => this.checkFormFields(el)),
        this.app.registration.regWrapper.buttons.forbidAddUser()
      );
    });

    clearRegistrFormButton.addEventListener('click', () => {
      inputs.forEach((input) => {
        removeClass(input, this.constants.VALID);
        removeClass(input, this.constants.INVALID);
        if (input.nextElementSibling?.classList.contains(this.constants.ERROR)) {
          this.validation.hideErrorMessage(input);
        }
      });
      this.app.registration.regWrapper.buttons.forbidAddUser();
    });

    selectCardType.addEventListener('change', () => {
      this.type = selectCardType.value;
    });

    selectDifficulty.addEventListener('change', () => {
      this.difficulty = selectDifficulty.value;
    });

    registButton.addEventListener('click', () => this.showRegistrationForm());

    registrationShadow.addEventListener('click', (e) => {
      if (e.target === registrationShadow) {
        this.closeRegistationForm();
      }
    });

    startGameButton.addEventListener('click', () => {
      this.initGame(this.type, this.difficulty);
    });

    stopGameButton.addEventListener('click', () => {
      this.app.main.gameField.timer.stopTimer();
      window.location.hash = '/about';
      this.app.header.wrapper.removeStopGameButton();
    });

    inputs.forEach((el) => el.addEventListener('input', () => 
      this.checkFormFields(el),
    ));

    this.initRouter();
  }

  showRegistrationForm() {
    this.app.registration.openRegistForm();
  }

  closeRegistationForm() {
    this.app.registration.closeRegistForm();
  }

  checkFormFields(el: HTMLInputElement) {
    (el.getAttribute('id') === 'email') ? this.validation.checkEmail(el) : this.validation.checkName(el); 
    const { inputs } = this.app.registration.regWrapper.form.formFields;
    const arr = inputs.filter((input) => input.classList.contains(this.constants.VALID));
    (arr.length !== inputs.length) ? (
      this.app.registration.regWrapper.buttons.forbidAddUser()
    ) : (
      this.app.registration.regWrapper.buttons.allowAddUser()
    );
  }

  initRouter() {
    window.location.hash = '#/about';
    window.addEventListener('hashchange', () => {
      const location = window.location.hash;
      if (location) {
        this.router.changeLocation(location, this.app.main, this.app.header.wrapper.nav);
      }
    });
    this.changeRout();
  }

  changeRout() {
    this.app.header.wrapper.nav.navElements.forEach((e, index) => {
      this.app.header.wrapper.nav.navElements[index].addEventListener('click', () => {
        this.app.header.wrapper.nav.removeActiveNavElement();
        this.app.header.wrapper.nav.makeNavElementActive(index);
        window.location.hash = `/${this.app.header.wrapper.nav.navLinks[index]}`;
      });
    });
  }

  initGame(type: string, difficulty: string) {
    window.location.hash = '/game';
    this.app.header.wrapper.nav.removeActiveNavElement();
    this.app.main.createGamePage(type, difficulty);
    this.app.header.wrapper.createStopGameButton();
  }
}
