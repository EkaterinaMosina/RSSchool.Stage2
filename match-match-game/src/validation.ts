import Constants from './constants';
import { removeClass } from './shared/shared';

export default class Validation {
  public readonly constants: Constants = new Constants();

  checkName(element: HTMLInputElement) {
    this.checkInputValueLength(element);
    this.checkInputValueSymbols(element);
    this.checkInputValueNumbers(element);
  }

  checkEmail(element: HTMLInputElement) {
    if (element.value.length === 0) {
      this.makeInputInvalid(element);
      this.showErrorMessage(element, this.constants.ERROR_MESSAGE_EMPTY_INPUT);
    } else if (element.value.length > 30) {
      this.makeInputInvalid(element);
      this.showErrorMessage(element, this.constants.ERROR_MESSAGE_LONG_INPUT);
    } else {
      const emailRegExp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      (emailRegExp.test(element.value)) ? (
        this.makeInputValid(element),
        this.hideErrorMessage(element)
      ) : (
        this.makeInputInvalid(element),
        this.showErrorMessage(element, this.constants.ERROR_MESSAGE_INVALID_EMAIL)
      );
    }
  }

  makeInputValid(element: HTMLInputElement) {
    removeClass(element, this.constants.INVALID);
    element.classList.add(this.constants.VALID);
  }

  makeInputInvalid(element: HTMLInputElement) {
    removeClass(element, this.constants.VALID);
    element.classList.add(this.constants.INVALID);
  }

  showErrorMessage(element: HTMLInputElement, message: string) {
    const errorField = element.nextElementSibling!;
    errorField.textContent = message;
    errorField.className = this.constants.ERROR;
  }

  hideErrorMessage(element: HTMLInputElement) {
    const errorField = element.nextElementSibling!;
    errorField.textContent = '';
    errorField.className = this.constants.NO_ERROR;
  }

  checkInputValueLength(element: HTMLInputElement) {
    (element.value.length === 0) ? (
      this.makeInputInvalid(element),
      this.showErrorMessage(element, this.constants.ERROR_MESSAGE_EMPTY_INPUT)
    ) : (element.value.length <= 30) ? (
      this.makeInputValid(element),
      this.hideErrorMessage(element)
    ) : (
      this.makeInputInvalid(element),
      this.showErrorMessage(element, this.constants.ERROR_MESSAGE_LONG_INPUT)
    );
  }

  checkInputValueSymbols(element: HTMLInputElement) {
    for (let i = 0; i < this.constants.FORBIDDEN_SYMBOLS.length; i += 1) {
      if (element.value.includes(this.constants.FORBIDDEN_SYMBOLS[i])) {
        this.makeInputInvalid(element);
        this.showErrorMessage(element, this.constants.ERROR_MESSAGE_SYMBOLS);
      }
    }
  }

  checkInputValueNumbers(element: HTMLInputElement) {
    const numberRegExp = /^[0-9]+$/;
    if (numberRegExp.test(element.value)) {
      this.makeInputInvalid(element);
      this.showErrorMessage(element, this.constants.ERROR_MESSAGE_NUMBERS);
    }
  }
}
