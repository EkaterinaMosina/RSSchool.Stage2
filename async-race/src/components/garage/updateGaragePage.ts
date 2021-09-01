import storage from '../../storage';
import { checkGaragePagination } from '../garagePagination/garagePagination';
import { garageListeners } from '../listeners/listeners';
import getCars from '../../server/getCars';
import createGarage from './createGarage'; 
import { renderElement } from '../../utils/utils';

export default async function updateGaragePage() {
  const { items, count } = await getCars(storage.carsPage);

  storage.cars = items;
  storage.carsCount = count;
  storage.carsButtonCount = Number(count);

  const garage = renderElement('#garage-view');
  garage.innerHTML = createGarage();
  
  checkGaragePagination();
  garageListeners(); 
}
