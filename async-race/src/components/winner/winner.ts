import storage from '../../storage';
import showCarImage from '../carImage/carImage';
import { Winner } from '../../interfaces';

export const createWinner = (position: number, winner: Winner) => {
  const { id, wins, time, car } = winner;
  return `
  <tr class="tr">
    <td class="td">${position}</td>
    <td class="td">${id}</td>
    <td class="td">${showCarImage(car.color)}</td>
    <td class="td">${car.name}</td>
    <td class="td">${wins}</td>
    <td class="td">${time}</td>
  </tr>`;
};

export const createWinnerField = () => {
  return storage.winners.map((winner, index) => createWinner(index + 1, winner)).join('');
};
