import { changePageToGarage, changePageToWinners, renderElement } from '../../utils/utils';
import { ParamsChangePage } from '../../interfaces';

export const createNavigation = () =>
  `
  <nav class="navigation">
    <button class="button button_garage active" id='button_garage'>to garage</button>
    <button class="button button_winners" id='button_winners'>to winners</button>
  </nav>
  `;

export const listenNav = () => {
  const buttonGarage = renderElement('#button_garage');
  const buttonWinners = renderElement('#button_winners');
  const garageView = renderElement('#garage-view');
  const winnersView = renderElement('#winners-view');

  const params: ParamsChangePage = {
    buttonGarage,
    buttonWinners,
    garageView,
    winnersView,
  };
  buttonGarage.addEventListener('click', () => {
    changePageToGarage(params);
  });
  buttonWinners.addEventListener('click', () => {
    changePageToWinners(params);
  });
};
