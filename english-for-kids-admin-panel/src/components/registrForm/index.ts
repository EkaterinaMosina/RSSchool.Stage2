import { renderElement } from '../../utils/render';
import { APP } from '../constants';
import regFormListeners from './handlers';

const renderRegistrForm = () => `
        <form class="reg-form">
            <div class="close-form"></div>
            <input type="text" autocomplete="off" id="input-login" class="form-input" placeholder="login">
            <input type="password" autocomplete="off" id="input-password" class="form-input" placeholder="password">
            <div class="btns-wrapper">
                <input type="submit" value="OK" class="form-btn form-btn-submit">
                <input type="reset" value="reset" class="form-btn">
            </div>
        </form>
    
`;

export const showLoginForm = () => {
  const formWrapper = document.createElement('div');
  formWrapper.className = 'reg-form-wrapper';
  const content = renderRegistrForm();
  formWrapper.innerHTML = content;

  const app = renderElement(APP);
  app.append(formWrapper);

  regFormListeners();
};

