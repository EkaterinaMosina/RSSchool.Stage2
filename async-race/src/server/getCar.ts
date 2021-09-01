import constants from '../constants';

export default async function getCar(id: number) {
  const response = await fetch(`${constants.GARAGE}/${id}`);
  const result = await response.json();
  return result;
}
