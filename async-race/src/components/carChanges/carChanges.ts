import { renderUpdateForm } from '../form/form';

export default function createCarChanges(name: string, id: number) {
  return `
  <div class="car-changes">
    <button class="button button_remove" id="button_remove-${id}">remove</button>
    <button class="button button_update" id="button_update-${id}">update</button>
    <span class="car-name">${name}</span>
    ${renderUpdateForm(id, name)}
  </div>
  `;
}
  


