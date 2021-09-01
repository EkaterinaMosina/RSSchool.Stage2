import constants from '../constants';
import { Car } from '../interfaces';
import { getHeaders, renderPageLimitParams } from './utils';

export default async function getCars(page: number, limit: number = 7) {
  const params = renderPageLimitParams(page, limit);
  const response = await fetch(`${constants.GARAGE}${params}`);
  const items = await response.json() as Car[];
  const count = getHeaders(response);

  const result = {
    items,
    count,
  };

  return result;
}