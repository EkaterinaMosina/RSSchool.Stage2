import { renderElement } from '../../utils/render';
import { FORM_FIELD } from '../constants';

export const hideLoginForm = () => {
  const formField = renderElement(FORM_FIELD);
  formField.remove();
};