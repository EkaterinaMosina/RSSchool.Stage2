import constants from '../constants';

export default async function removeWinner(id: number) {
  const response = await fetch(`${constants.WINNERS}/${id}`, { method: 'DELETE' });
  const result = response.json();
  return result;
}
