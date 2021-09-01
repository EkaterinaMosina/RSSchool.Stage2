import constants from '../constants';
import { renderStatusStopped } from './utils';

export default async function stopEngine(id: number) {
  const params = renderStatusStopped(id);
  const response = await fetch(`${constants.ENGINE}${params}`);
  const result = response.json();
  return result;
}
