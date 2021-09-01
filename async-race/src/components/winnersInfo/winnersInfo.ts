import storage from '../../storage';
import { countWinnersPages } from '../../utils/utils';

export default function createWinnersInfo() {
  return `
  <div class="winners-info">
    <h1>Winners (${storage.winnersCount})</h1>
    <h2>Page #${storage.winnersPage} of ${countWinnersPages()}</h2>
  </div>
  `;
}
