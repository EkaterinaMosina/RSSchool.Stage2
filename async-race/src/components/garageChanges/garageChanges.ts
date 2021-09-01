import { renderCreateForm } from '../form/form';

export default function createGarageChanges() {
  return `
  <div class="garage-adding">
    ${renderCreateForm()}
    <button class="button button_generate-cars" id="generate">generate 100 cars</button>
  </div>
  `;
}
  