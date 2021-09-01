import storage from '../storage';
import constants from '../constants';
import { Winner } from '../interfaces';
import getCar from './getCar';
import { getHeaders, renderPageLimitParams } from './utils';

const getSortAndOrder = () => {
  return `&_sort=${storage.sortBy}&_order=${storage.sortOrder}`;
};

export default async function getWinnersSorted(page: number, limit: number = 10) {
  const params = renderPageLimitParams(page, limit);
  const sortAndOrder = getSortAndOrder();
  const response = await fetch(`${constants.WINNERS}${params}${sortAndOrder}`);
  const winners = await response.json() as Winner[];
  const proms = winners.map(async (winner) => ({ ...winner, car: await getCar(winner.id) }));
  const items =  await Promise.all(proms) as Winner[];
  const count = getHeaders(response);

  const result = {
    items,
    count,
  }; 

  return result;
}
