import getCars from './server/getCars';
import getWinners from './server/getWinners';

const { items: cars, count: carsCount } = await getCars(1);
const { items: winners, count: winnersCount } = await getWinners(1);
const carsButtonCount = Number(carsCount);

export default {
  carsPage: 1,
  cars,
  carsCount,
  winnersPage: 1,
  winners,
  winnersCount,
  sortBy: '',
  sortOrder: '',
  carsButtonCount,
};
