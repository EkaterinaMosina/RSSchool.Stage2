import constants from '../constants';
import { Winner } from '../interfaces';
import getCar from './getCar';
import { getHeaders, renderPageLimitParams } from './utils';

export default async function getWinners(page: number, limit: number = 10) {
  const params = renderPageLimitParams(page, limit);
  const response = await fetch(`${constants.WINNERS}${params}`);
  const winners = await response.json() as Winner[];
  const proms = winners.map(async (winner) => ({ ...winner, car: await getCar(winner.id) }));
  const items = await Promise.all(proms) as Winner[];
  const count = getHeaders(response);

  const result =  {
    items,
    count,
  };

  return result;
}
