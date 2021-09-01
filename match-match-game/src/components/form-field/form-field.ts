import BaseComponent from '../base-component';
import './form-field.scss';

export default class FormField extends BaseComponent {
  constructor() {
    super('div', ['form__field']);
  }
}
