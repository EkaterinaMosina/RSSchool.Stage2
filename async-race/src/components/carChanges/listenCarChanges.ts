import storage from '../../storage';
import { forbidClick, renderElement, showForm } from '../../utils/utils';
import updateGaragePage from '../garage/updateGaragePage';
import removeCar from '../../server/removeCar';
import removeWinner from '../../server/removeWinner';
import { updateWinnersPage } from '../winners/winners';


export default function listenCarChanges()  {
  const ids = storage.cars.map((car) => car.id);
  ids.forEach((id) => {
    const removeButton = renderElement(`#button_remove-${id}`);
    const updateButton = renderElement(`#button_update-${id}`);

    removeButton.addEventListener('click', async () => {
      await removeCar(id);
      await updateGaragePage();
      await removeWinner(id);
      await updateWinnersPage();
    });

    updateButton.addEventListener('click', () => {
      forbidClick(updateButton);
      const updateForm = renderElement(`#form-update-${id}`);
      showForm(updateForm);
    });
  });
}