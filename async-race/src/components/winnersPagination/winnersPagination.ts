import storage from '../../storage';
import { allowVisitPage, forbidVisitPage } from '../../utils/utils';
import constants from '../../constants';
import { updateWinnersPage } from '../winners/winners';


export const createWinnersPagePagination = () =>
  `
  <div class="pagination">
    <button class="button button-pagination noactive" id="winners-prev-page">prev</button>
    <button class="button button-pagination noactive" id="winners-next-page">next</button>
  </div>
  `;
  
export const checkWinnersPagination = () => {
  const count = storage.winnersCount;
  const { winnersPage } = storage;
  const winnersQuantity = Number(count);
  const nextPage = document.querySelector('#winners-next-page') as HTMLElement;
  const prevPage = document.querySelector('#winners-prev-page') as HTMLElement;

  winnersPage * constants.MAX_WINNERS_PER_PAGE < winnersQuantity 
    ? allowVisitPage(nextPage) 
    : forbidVisitPage(nextPage);

  winnersPage > 1 ? allowVisitPage(prevPage) : forbidVisitPage(prevPage);
};

export const listenWinnersPagination = () => {
  const prev = document.getElementById('winners-prev-page') as HTMLElement;
  const next = document.getElementById('winners-next-page') as HTMLElement;

  next.addEventListener('click', async () => {
    storage.winnersPage += 1;
    await updateWinnersPage();
  });

  prev.addEventListener('click', async () => {
    storage.winnersPage -= 1;
    await updateWinnersPage();
  });
};
