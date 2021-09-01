import storage from '../../storage';
import createCarChanges from '../carChanges/carChanges';
import { createCarControl } from '../carControl/carControl';
import showCarImage from '../carImage/carImage';
import { Car } from '../../interfaces';

const showCarField = (car: Car) => {
  const { name, color, id } = car;

  return `
    <li class="car-field" id="car-field-${id}">
      ${createCarChanges(name, id)}
      <div class="road">
          <div class="wrapper">
              ${createCarControl(id)}
              <div class="car" id="car-${id}">
                ${showCarImage(color)}
              </div>
          </div>
          <div class="finish" id="finish-${id}">
          </div>
      </div>
    </li>
  `;
};

export default function createCarField() {
  return storage.cars.map((car) => showCarField(car)).join('');
}
