import createGarage from '../garage/createGarage';
import { checkGaragePagination } from '../garagePagination/garagePagination';
import { createNavigation } from '../navigation/navigation';
import { createWinnersPage } from '../winners/winners';
import { checkWinnersPagination } from '../winnersPagination/winnersPagination';

export default function showApp() {
  const content = 
  `
  ${createNavigation()}
  <div id="garage-view">
    ${createGarage()}
  </div>
  <div id="winners-view" style="display: none">
    ${createWinnersPage()}
  </div>
  `;
  const rootElement = document.createElement('div');
  rootElement.className = 'app';
  rootElement.innerHTML = content;
  document.body.append(rootElement);

  checkGaragePagination();
  checkWinnersPagination();
}
