import {
  allowClick,
  createWinnerAfterRace,
  forbidClick,
  moveAll,
  renderElement,
  stopAll,
  updateWinnerAfterRace,
} from '../../utils/utils';
import getWinner from '../../server/getWinner';
import showWinnerMessage from '../winnerMessage/winnerMessage';
import { updateWinnersPage } from '../winners/winners';

export const createRacingControl = () =>
  `
  <div class="racing-control">
    <button class="start-race">let's racing</button>
    <button class="stop-race forbidden">return to start</button>
  </div>
  `;

export const listenRacingControl = () => {
  const buttonStart = renderElement('.start-race');
  const buttonStop = renderElement('.stop-race');

  buttonStart.addEventListener('click', async () => {
    forbidClick(buttonStart);

    const { time: newTime, name, id } = await moveAll();
    if (name === '') return;

    showWinnerMessage(name, newTime);

    const winnerFromServer = await getWinner(id);
    Object.keys(winnerFromServer).length === 0
      ? await createWinnerAfterRace(id, newTime)
      : await updateWinnerAfterRace(id, newTime);

    await updateWinnersPage();

    allowClick(buttonStop);
  });

  buttonStop.addEventListener('click', async () => {
    forbidClick(buttonStop);
    await stopAll();
    allowClick(buttonStart);
  });
};
