import storage from '../../storage';
import { renderElement, startMoving, stopMoving } from '../../utils/utils';
import { ParamsToMove } from '../../interfaces';

export const createCarControl = (id: number) =>
  `
  <div class="car-control">
    <button class="button-start" id="start-${id}">go</button>
    <button class="button-stop forbidden" id="stop-${id}">stop</button>
  </div>
`;

export const listenCarControl = () => {
  storage.cars.forEach((car) => {
    const { id } = car;
    const carImage = renderElement(`#car-${id}`);
    const buttonStart = renderElement(`#start-${id}`);
    const buttonStop = renderElement(`#stop-${id}`);

    const paramsToMove: ParamsToMove = {
      carImage,
      id,
      buttonStart,
      buttonStop,
    };

    buttonStart.addEventListener('click', () => {
      startMoving(paramsToMove);
    });

    buttonStop.addEventListener('click', () => {
      stopMoving(paramsToMove);
    });
  });
};
