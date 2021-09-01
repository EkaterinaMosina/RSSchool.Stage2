import listenCarChanges from '../carChanges/listenCarChanges';
import { listenCarControl } from '../carControl/carControl';
import { listenInputsCreateForm, listenInputsUpdateForm } from '../form/form';
import listenGarageChanges from '../garageChanges/listenGarageChanges';
import { listenGaragePagination } from '../garagePagination/garagePagination';
import { listenNav } from '../navigation/navigation';
import { listenRacingControl } from '../racingControl/racingControl';
import { listenWinnersPagination } from '../winnersPagination/winnersPagination';
import { listenWinnersTable } from '../winnersTable/createWinnersTable';

export const garageListeners = () => {
  listenGarageChanges();
  listenGaragePagination();
  listenInputsCreateForm();
  listenCarChanges();
  listenInputsUpdateForm();
  listenCarControl();
  listenRacingControl();
};

export const winnersListeners = () => {
  listenWinnersPagination();
  listenWinnersTable();
};

export const listeners = () => {
  listenNav();
  garageListeners();
  winnersListeners();
};
