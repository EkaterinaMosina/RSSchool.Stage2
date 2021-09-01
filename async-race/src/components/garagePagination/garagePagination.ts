import storage from '../../storage';
import { allowVisitPage, forbidVisitPage, renderElement } from '../../utils/utils';
import constants from '../../constants';

import updateGaragePage from '../garage/updateGaragePage';

export const createGaragePagination = () =>
  `
  <div class="pagination">
    <button class="button button-pagination noactive" id="garage-prev-page">prev</button>
    <button class="button button-pagination noactive" id="garage-next-page">next</button>
  </div>
  `;

export const checkGaragePagination = () => {
  const count = storage.carsCount;
  const { carsPage } = storage;
  const carsQuantity = Number(count);
  const nextPage = renderElement('#garage-next-page');
  const prevPage = renderElement('#garage-prev-page');

  (carsPage * constants.MAX_CARS_PER_PAGE < carsQuantity) 
    ? allowVisitPage(nextPage) 
    : forbidVisitPage(nextPage);
  (carsPage > 1) ? allowVisitPage(prevPage) : forbidVisitPage(prevPage);
};

export const listenGaragePagination = () => {
  const prev = renderElement('#garage-prev-page');
  const next = renderElement('#garage-next-page');

  next.addEventListener('click', async () => {
    storage.carsPage += 1;
    await updateGaragePage();
  });

  prev.addEventListener('click', async () => {
    storage.carsPage -= 1;
    await updateGaragePage();
  });
};
