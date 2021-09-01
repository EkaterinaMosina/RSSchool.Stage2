import storage from '../../storage';
import getWinnersSorted from '../../server/getWinnersSorted';
import { createWinnerField } from '../winner/winner';

export default async function updateWinnersTable()  {
  const { items, count } = await getWinnersSorted(storage.winnersPage);
  storage.winners = items;
  storage.winnersCount = count;
  const tableBody = document.querySelector('.table-body') as HTMLElement;
  tableBody.innerHTML = createWinnerField();
}