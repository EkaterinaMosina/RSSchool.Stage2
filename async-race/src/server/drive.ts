import constants from '../constants';
import { renderStatusDrive } from './utils';

export default async function drive(id: number) {
  try {
    const params = renderStatusDrive(id);
    const response = await fetch(`${constants.ENGINE}${params}`);
    const result = await response.json();
    return result;
  } catch (err) {
    const result = { success: false };
    return result;
  }
}
