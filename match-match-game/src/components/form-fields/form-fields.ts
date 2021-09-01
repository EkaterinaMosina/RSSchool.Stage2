import BaseComponent from '../base-component';
import FormField from '../form-field/form-field';
import Input from '../input/input';
import './form-fields.scss';
import Constants from '../../constants';

export default class FormFields extends BaseComponent {
  public formFieldFirstName: FormField = new FormField();

  public formFieldLastName: FormField = new FormField();

  public formFieldEmail: FormField = new FormField();

  public readonly constants: Constants = new Constants();

  public inputFirstName: Input = new Input(
    this.constants.INPUT_TAG,
    [this.constants.INPUT_TAG],
    this.constants.FIRST_NAME,
    this.constants.TYPE_TEXT,
    '',
  );

  public inputLastName: Input = new Input(
    this.constants.INPUT_TAG,
    [this.constants.INPUT_TAG],
    this.constants.LAST_NAME,
    this.constants.TYPE_TEXT,
    '',
  );

  public inputEmail: Input = new Input(this.constants.INPUT_TAG, [this.constants.INPUT_TAG], this.constants.EMAIL, this.constants.EMAIL, '');

  public emailError: BaseComponent = new BaseComponent('div', ['error']);

  public firstNameError: BaseComponent = new BaseComponent('div', ['error']);

  public lastNameError: BaseComponent = new BaseComponent('div', ['error']);

  public readonly inputs: HTMLInputElement[] = [];

  constructor() {
    super('div', ['form__fields']);

    this.createFormField(
      this.formFieldFirstName,
      this.constants.FIRST_NAME_LABEL,
      this.inputFirstName,
      this.firstNameError,
      this.constants.KEY_FIRST_NAME,
    );
    this.createFormField(
      this.formFieldLastName,
      this.constants.LAST_NAME_LABEL,
      this.inputLastName,
      this.lastNameError,
      this.constants.KEY_LAST_NAME,
    );
    this.createFormField(
      this.formFieldEmail,
      this.constants.EMAIL_LABEL,
      this.inputEmail,
      this.emailError,
      this.constants.KEY_EMAIL,
    );
  }

  createFormField(
    formfield: FormField,
    label: string,
    input: Input,
    error: BaseComponent,
    key: string,
  ) {
    const newFormfield = formfield;
    newFormfield.element.innerHTML = label;
    newFormfield.element.append(input.element);
    input.element.setAttribute('autocomplete', 'off');
    input.element.addEventListener('change', () => localStorage.setItem(`${key}`, input.element.value));
    newFormfield.element.append(error.element);
    this.element.append(newFormfield.element);
    this.inputs.push(input.element);
  }
}
