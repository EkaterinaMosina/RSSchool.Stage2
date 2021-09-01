import constants from '../constants';
import { WinnerUpdate } from '../interfaces';
import { renderMethodPut } from './utils';

export default async function updateWinner(id: number, winner: WinnerUpdate) {
  const params = renderMethodPut(winner);
  const response = await fetch(`${constants.WINNERS}/${id}`, params);
  const result = response.json();
  return result;
}