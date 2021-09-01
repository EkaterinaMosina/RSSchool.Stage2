import constants from '../constants';
import { WinnerServer } from '../interfaces';
import { renderMethodPost } from './utils';

export default async function addWinner(winner: WinnerServer) {
  const params = renderMethodPost(winner);
  const response = await fetch(constants.WINNERS, params);
  const result = await response.json();
  return result;
}