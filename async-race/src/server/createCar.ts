import constants from '../constants';
import { renderMethodPost } from './utils';

export default async function createCar(car: object) {
  const params = renderMethodPost(car);
  const response = await fetch(constants.GARAGE, params);
  const result = await response.json();
  return result;
}