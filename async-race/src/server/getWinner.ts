import constants from '../constants';

export default async function getWinner(id: number) {
  const response = await fetch(`${constants.WINNERS}/${id}`);
  const result = await response.json();
  return result;
}
