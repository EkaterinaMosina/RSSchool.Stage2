import constants from '../constants';

export default async function removeCar(id: number) {
  const response = await fetch(`${constants.GARAGE}/${id}`, { method: 'DELETE' });
  const result = await response.json();
  return result;
}
