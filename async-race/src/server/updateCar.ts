import constants from '../constants';
import { renderMethodPut } from './utils';

export default async function updateCar(id: number, car: object) {
  const params = renderMethodPut(car);
  const response = await fetch(`${constants.GARAGE}/${id}`, params);
  const result = response.json();
  return result;
 
}
