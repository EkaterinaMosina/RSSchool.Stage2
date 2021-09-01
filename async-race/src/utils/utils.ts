import storage from '../storage';
import constants from '../constants';
import {
  Car,
  ParamsChangePage,
  ParamsRacing,
  ParamsToAnimation,
  ParamsToMove,
  Result,
  TableCellContent,
  WinnerServer,
  WinnerToSave,
} from '../interfaces';
import addWinner from '../server/addWinner';
import drive from '../server/drive';
import getWinner from '../server/getWinner';
import startEngine from '../server/startEngine';
import stopEngine from '../server/stopEngine';
import updateWinner from '../server/updateWinner';

export const setItemLocalStorage = (param: number, value: number) => {
  const itemParam = String(param);
  const itemValue = String(value);

  if (localStorage.getItem(itemParam)) {
    localStorage.removeItem(itemParam);
  }
  localStorage.setItem(itemParam, itemValue);
};

export const allowClick = (button: HTMLElement) => {
  button.classList.remove(constants.FORBID_CLICK);
};

export const forbidClick = (button: HTMLElement) => {
  button.classList.add(constants.FORBID_CLICK);
};

export const returnCarToStart = (carImage: HTMLElement) => {
  carImage.setAttribute('style', 'transform: translateX(0)');
};

export const allowVisitPage = (button: HTMLElement) => {
  button.classList.remove(constants.NOACTIVE);
};

export const forbidVisitPage = (button: HTMLElement) => {
  button.classList.add(constants.NOACTIVE);
};

export const showPage = (page: HTMLElement) => {
  page.setAttribute('style', 'display: block');
};

export const hidePage = (page: HTMLElement) => {
  page.setAttribute('style', 'display: none');
};

export const addActiveView = (button: HTMLElement) => {
  button.classList.add(constants.ACTIVE);
};

export const removeActiveView = (button: HTMLElement) => {
  button.classList.remove(constants.ACTIVE);
};

export const showForm = (form: HTMLElement) => {
  form.setAttribute('style', 'opacity: 1');
};

export const countGaragePages = () => 
  Math.ceil(Number(storage.carsCount) / constants.MAX_CARS_PER_PAGE);

export const countWinnersPages = () => 
  Math.ceil(Number(storage.winnersCount) / constants.MAX_WINNERS_PER_PAGE);

const getIndex = (part: string[]) => {
  const { length } = part;
  const index = Math.floor(Math.random() * length);
  return index;
};

const GET_RANDOM_NAME = () => {
  const firstPart: string[] = constants.CAR_FIRST_NAME;
  const secondPart: string[] = constants.CAR_LAST_NAME;
  const firstIndex = getIndex(firstPart);
  const secondIndex = getIndex(secondPart);
  const randomName = `${firstPart[firstIndex]  } ${  secondPart[secondIndex]}`;
  return randomName;
};

const GET_RANDOM_COLOR = () => {
  const symbols = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += symbols[Math.floor(Math.random() * symbols.length)];
  }
  return color;
};

export const GENERATE_100_RANDOM_CARS = () => {
  const randomCars = [];
  for (let i = 0; i < 100; i += 1) {
    const car = {
      name: GET_RANDOM_NAME(),
      color: GET_RANDOM_COLOR(),
    };
    randomCars.push(car);
  }
  return randomCars;
};

export const changePageToWinners = (params: ParamsChangePage) => {
  const { buttonGarage, buttonWinners, garageView, winnersView } = params;
  removeActiveView(buttonGarage);
  addActiveView(buttonWinners);
  showPage(winnersView);
  hidePage(garageView);
};

export const changePageToGarage = (params: ParamsChangePage) => {
  const { buttonGarage, buttonWinners, garageView, winnersView } = params;
  removeActiveView(buttonWinners);
  addActiveView(buttonGarage);
  showPage(garageView);
  hidePage(winnersView);
};

export const updateWinnerWithNewTime = async (winsNew: number, idWinner: number, newTime: number) => {
  const winner = {
    wins: winsNew,
    time: newTime,
  };
  await updateWinner(idWinner, winner);
};

export const updateWinnerWithOldTime = async (winsNew: number, idWinner: number, time: number) => {
  const winner = {
    wins: winsNew,
    time,
  };
  await updateWinner(idWinner, winner);
};

export const createWinnerAfterRace = async (id: number, newTime: number) => {
  const winner = {
    id,
    wins: 1,
    time: newTime,
  };
  await addWinner(winner);
};

export const updateWinnerAfterRace = async (id: number, newTime: number) => {
  const { id: idWinner, wins, time } = (await getWinner(id)) as WinnerServer;
  let winsNew = wins;
  winsNew += 1;
  time > newTime
    ? await updateWinnerWithNewTime(winsNew, idWinner, newTime)
    : await updateWinnerWithOldTime(winsNew, idWinner, time);
};

export const tableCellContent: TableCellContent = {
  id: 'id',
  wins: 'Wins',
  time: 'Best time(sec)',
};

export const sortTableCell = async (tableCel: HTMLTableCellElement, tableCellId: string) => {
  const tableCell = tableCel;
  const key = tableCellId;
  storage.sortBy = tableCellId;
  if (storage.sortOrder === '') {
    storage.sortOrder = 'asc';
    tableCell.innerHTML = `${tableCellContent[key]}↑`;
  } else if (storage.sortOrder === 'asc') {
    storage.sortOrder = 'desc';
    tableCell.innerHTML = `${tableCellContent[key]}↓`;
  } else if (storage.sortOrder === 'desc') {
    storage.sortOrder = '';
    storage.sortBy = '';
    tableCell.innerHTML = `${tableCellContent[key]}`;
  }
};

const animation = (paramsToAnimation: ParamsToAnimation) => {
  const { carImage, id, HTMLdistance, animationTime } = paramsToAnimation;

  let start: number | null = null;
  let requestID;

  function step(timestamp: number) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const progress = Math.round(time * (HTMLdistance / animationTime));
    carImage.setAttribute('style', `transform:translateX(${Math.min(progress, HTMLdistance)}px)`);

    if (progress < HTMLdistance) {
      requestID = window.requestAnimationFrame(step);
      setItemLocalStorage(id, requestID);
    }
  }
  requestID = window.requestAnimationFrame(step);
  setItemLocalStorage(id, requestID);

  return requestID;
};

export const renderElement = (id: string) => document.querySelector(id) as HTMLElement;

export const renderInput = (id: string) => document.querySelector(id) as HTMLInputElement;

export const startMoving = async (params: ParamsToMove) => {
  const { carImage, id, buttonStart, buttonStop } = params;

  forbidClick(buttonStart);
  const buttonRaceAll = renderElement('.start-race');
  forbidClick(buttonRaceAll);

  storage.carsButtonCount -= 1;
  const { velocity, distance } = await startEngine(id);
  allowClick(buttonStop);
  const animationTime = Math.round(distance / velocity);
  const app = renderElement('.app');
  const HTMLdistance = Math.floor(app.getBoundingClientRect().width) - 265;

  const paramsToAnimation = {
    carImage,
    id,
    HTMLdistance,
    animationTime,
  };

  const requestID = animation(paramsToAnimation);
  setItemLocalStorage(id, requestID);

  const { success } = await drive(id);

  if (!success) {
    window.cancelAnimationFrame(Number(localStorage.getItem(`${id}`)));
  }

  return { success, id, animationTime };
};

export const stopMoving = async (params: ParamsToMove) => {
  const { carImage, id, buttonStart, buttonStop } = params;

  forbidClick(buttonStop);
  storage.carsButtonCount += 1;
  await stopEngine(id);
  const requestID = Number(localStorage.getItem(`${id}`));
  window.cancelAnimationFrame(requestID);
  returnCarToStart(carImage);
  allowClick(buttonStart);
  const buttonRaceAll = document.querySelector('.start-race') as HTMLElement;
  if (storage.carsButtonCount === Number(storage.carsCount)) {
    allowClick(buttonRaceAll);
  }
};

const defineWinner = async (promises: Promise<Result>[], indexes: number[]): Promise<WinnerToSave> => {
  const { success, id, animationTime } = await Promise.race(promises);
  if (!success) {
    const brokenCarIndex = indexes.findIndex((i) => i === id);

    const restPromises = 
    [
      ...promises.slice(0, brokenCarIndex), 
      ...promises.slice(brokenCarIndex + 1, promises.length),
    ];

    const restIndexes = 
    [
      ...indexes.slice(0, brokenCarIndex), 
      ...indexes.slice(brokenCarIndex + 1, indexes.length),
    ];

    if (restIndexes.length === 0) {
      return { time: 0, name: '', color: '', id: 0 };
    }

    return defineWinner(restPromises, restIndexes);
  }
  const carWinner = storage.cars.find((car) => car.id === id) as Car;
  const winnerTime = +(animationTime / 1000).toFixed(2);
  const result: WinnerToSave = { ...carWinner, time: winnerTime };
  
  return result;
};

const showBrokenEngineMessage = (carField: HTMLElement, name: string, id: number) => {
  const message = document.createElement('p');
  message.className = 'message-broken-engine';
  message.setAttribute('id', `broken-message-${id}`);
  message.innerHTML = `${name} is out of race because the engine was broken down`;
  carField.append(message);
};

const hideBrokenEngineMessage = (id: number) => {
  const message = document.querySelector(`#broken-message-${id}`) as HTMLElement;
  if (message) {
    message.remove();
  }
};

const startRacing = async (paramsRacing: ParamsRacing) => {
  const { id, carImage, startButton, params, carField, name } = paramsRacing;

  forbidClick(startButton);
  const { velocity, distance } = params;
  const animationTime = Math.round(distance / velocity);
  const app = renderElement('.app');
  const HTMLdistance = Math.floor(app.getBoundingClientRect().width) - 265;
  const paramsToAnimation = {
    carImage,
    id,
    HTMLdistance,
    animationTime,
  };
  const requestID = animation(paramsToAnimation);
  setItemLocalStorage(id, requestID);

  const { success } = await drive(id);
  if (!success) {
    window.cancelAnimationFrame(Number(localStorage.getItem(`${id}`)));
    showBrokenEngineMessage(carField, name, id);
  }
  const res: Result = { success, id, animationTime };
  return res;
};

export const moveAll = async () => {
  storage.cars.forEach((car) => {
    const buttonStart = renderElement(`#start-${car.id}`);
    forbidClick(buttonStart);
  });

  const arr = await Promise.all(storage.cars.map((car) => startEngine(car.id)));
  const promises: Promise<Result>[] = [];
  const indexes: number[] = [];
  storage.cars.forEach((car, index) => {
    const { id, name } = car;

    const carImage = renderElement(`#car-${id}`);
    const startButton = renderElement(`#start-${id}`);
    const carField = renderElement(`#car-field-${id}`);

    const paramsRacing = {
      id,
      carImage,
      startButton,
      params: arr[index],
      carField,
      name,
    };
    const promise = startRacing(paramsRacing);

    promises.push(promise);
    indexes.push(id);
  });
  const res = await defineWinner(promises, indexes);

  return res;
};

export const stopAll = async () => {
  storage.cars.forEach((car) => {
    const buttonStop = renderElement(`#stop-${car.id}`);
    forbidClick(buttonStop);
  });
  await Promise.all(storage.cars.map((car) => stopEngine(car.id)));
  storage.cars.forEach((car) => {
    const carImage = renderElement(`#car-${car.id}`);
    const startButton = renderElement(`#start-${car.id}`);
    const requestID = Number(localStorage.getItem(`${car.id}`));

    window.cancelAnimationFrame(requestID);
    hideBrokenEngineMessage(car.id);
    returnCarToStart(carImage);
    allowClick(startButton);
  });
};




