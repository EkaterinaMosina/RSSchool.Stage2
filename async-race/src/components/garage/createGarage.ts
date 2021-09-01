import createGarageInfo from '../garageInfo/garageInfo';
import createGarageChanges from '../garageChanges/garageChanges';
import { createRacingControl } from '../racingControl/racingControl';
import { createGaragePagination } from '../garagePagination/garagePagination';
import createCarField from '../carField/carField';

export default function createGarage() {
  return `
  <div id="garage">
    ${createGarageInfo()}
    ${createGarageChanges()}
    ${createRacingControl()}
    <ul class="cars-field">
        ${createCarField()}
    </ul>
    ${createGaragePagination()}
  </div>
`;
}
  
