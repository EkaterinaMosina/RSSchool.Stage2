import { chechAdminData } from '../../api/index';
import changeLocation from '../../router/changeLocation';
import { renderElement, renderInputElement } from '../../utils/render';
import { ADMIN_PAGE, CLOSE_FORM, FORM_BTN_SUBMIT, MAIN_PAGE } from '../constants';
import { hideLoginForm } from './utils';

export default function regFormListeners() {
  const btnSubmit = renderElement(FORM_BTN_SUBMIT);
  const closeForm = renderElement(CLOSE_FORM);
  const inputLogin = renderInputElement('#input-login');
  const inputPassword = renderInputElement('#input-password');
   
  btnSubmit.addEventListener('click', async (e) => {
    e.preventDefault();
    const adminData = {
      userName: inputLogin.value,
      password: inputPassword.value,
    };
    try {
      const success = await chechAdminData(adminData);
      localStorage.setItem('katundra', success);
      hideLoginForm(); 
      changeLocation(ADMIN_PAGE);
        
    } catch (e) {
      alert('Username or password incorrect');
      hideLoginForm(); 
      changeLocation(MAIN_PAGE);
    }
  });

  closeForm.addEventListener('click', () => hideLoginForm());
    
}