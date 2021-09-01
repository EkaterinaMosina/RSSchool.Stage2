import storage from '../../storage';
import { allowClick, renderElement, renderInput } from '../../utils/utils';
import updateGaragePage from '../garage/updateGaragePage';
import updateCar from '../../server/updateCar';
import updateWinnersTable from '../winnersTable/updateWinnersTable';


export const renderCreateForm = () =>
  `
  <form class="form form-create">
    <input type="text" class="input" id="text-create" required="">
    <input type="color" class="color" id="color-create">
    <button type="submit" class="submit">create</button>
  </form>
  `;

export const listenInputsCreateForm = () => {
  const inputName = renderInput('#text-create');
  const inputColor = renderInput('#color-create');

  inputName.addEventListener('change', () => {
    localStorage.setItem('name', inputName.value);
  });

  inputColor.addEventListener('change', () => {
    localStorage.setItem('color', inputColor.value);
  });
};

export const renderUpdateForm = (id: number, name: string) =>
  `
  <form class="form form-update" id="form-update-${id}" style="opacity:0">
    <input type="text" class="input" id="input-update-${id}" value="${name}">
    <input type="color" class="color" id="color-update-${id}">
    <button type="submit" class="submit" id="submit-${id}">update</button>
  </form>
`;

export const listenInputsUpdateForm = () => {
  storage.cars.forEach((car) => {
    const { name, color, id } = car;
    const inputName = renderInput(`#input-update-${id}`);
    const inputColor = renderInput(`#color-update-${id}`);
    const updateForm = renderInput(`#form-update-${id}`);

    inputName.addEventListener('change', () => {
      localStorage.setItem('name', inputName.value);
    });

    inputColor.addEventListener('change', () => {
      localStorage.setItem('color', inputColor.value);
    });

    updateForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const carUpdate = {
        name: localStorage.getItem('name'),
        color: localStorage.getItem('color'),
      };
      if (localStorage.getItem('name') === null) {
        carUpdate.name = name;
      }
      if (localStorage.getItem('color') === null) {
        carUpdate.color = color;
      }

      await updateCar(id, carUpdate);
      await updateGaragePage();
      await updateWinnersTable();

      localStorage.clear();

      const updateButton = renderElement(`#button_update-${id}`);
      allowClick(updateButton);
    });
  });
};
