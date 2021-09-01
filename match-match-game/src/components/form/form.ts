import BaseComponent from '../base-component';
import FormFields from '../form-fields/form-fields';
import './form.scss';
import Input from '../input/input';

export default class Form extends BaseComponent {
  public readonly formFields: FormFields;

  public readonly formIcoField: BaseComponent = new BaseComponent('div', ['ico-field']);


  public fileInput: Input = new Input('input', ['file-input'], 'fileInput', 'file', '');

  constructor() {
    super('div', ['form']);
    this.formIcoField.element.append(this.fileInput.element);
    this.element.append(this.formIcoField.element);
    this.formFields = new FormFields();
    this.element.append(this.formFields.element);
    this.fileInput.element.addEventListener('change', () => this.showAndSaveUserPhoto());
  }

  showAndSaveUserPhoto() {
    if (window.FileReader) {
      const file  = this.fileInput.element.files![0];
      const reader = new FileReader();
      if (file && file.type.match('image.*')) {
        reader.readAsDataURL(file);
      }
      reader.onloadend = () => {
        localStorage.setItem('userIco', reader.result as string);
        this.formIcoField.element.setAttribute('style', `background-image: url(${reader.result as string}); background-size: cover;`);
      };
    }
  }
}
