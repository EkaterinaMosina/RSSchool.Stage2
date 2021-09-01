import constants from '../constants';
import { renderStatusStarted } from './utils';

export default async function startEngine(id: number) {
  const params = renderStatusStarted(id);
  const response = await fetch(`${constants.ENGINE}${params}`);
  const result = response.json();
  return result;
}
