
import createWinnersInfo from '../winnersInfo/winnersInfo';
import { createWinnersPagePagination, checkWinnersPagination } from '../winnersPagination/winnersPagination';
import { createWinnersTable } from '../winnersTable/createWinnersTable';
import storage from '../../storage';
import { winnersListeners } from '../listeners/listeners';
import getWinners from '../../server/getWinners';

export const createWinnersPage = () =>
  `
  <div class="winners" id="winners">
    ${createWinnersInfo()}
    ${createWinnersTable()}
    ${createWinnersPagePagination()}
  </div>
  `;

export  const updateWinnersPage = async ()=> {
  const { items, count } = await getWinners(storage.winnersPage);
  storage.winners = items;
  storage.winnersCount = count;
    
  const winners = document.querySelector('#winners-view');
  if (winners !== null) {
    winners.innerHTML = createWinnersPage();
  }
    
  checkWinnersPagination();
  winnersListeners();
};

