import storage from '../../storage';
import { countGaragePages } from '../../utils/utils';

export default function createGarageInfo() {
  return `
    <div class="garage-info">
      <h1>Garage (${storage.carsCount})</h1>
      <h2>Page #${storage.carsPage}  of ${countGaragePages()}</h2>
    </div>
  `;
}
