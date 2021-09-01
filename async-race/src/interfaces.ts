export interface Params {
  velocity: number;
  distance: number;
}
export interface Result {
  success: boolean;
  id: number;
  animationTime: number;
}
export interface WinnerToSave {
  time: number;
  name: string;
  color: string;
  id: number;
}
export interface Car {
  name: string;
  color: string;
  id: number;
}
export interface Winner {
  id: number;
  wins: number;
  time: number;
  car: Car;
}

export interface WinnerServer {
  id: number;
  wins: number;
  time: number;
}

export interface WinnerUpdate {
  wins: number;
  time: number;
}

export interface ParamsToMove {
  carImage: HTMLElement;
  id: number;
  buttonStart: HTMLElement;
  buttonStop: HTMLElement;
}

export interface ParamsToAnimation {
  carImage: HTMLElement;
  id: number;
  HTMLdistance: number;
  animationTime: number;
}

export interface ParamsRacing {
  id: number;
  carImage: HTMLElement;
  startButton: HTMLElement;
  params: Params;
  carField: HTMLElement;
  name: string;
}

export interface TableCellContent {
  id: string;
  wins: string;
  time: string;
  [key: string]: string;
}

export interface ParamsChangePage {
  buttonGarage: HTMLElement;
  buttonWinners: HTMLElement;
  garageView: HTMLElement;
  winnersView: HTMLElement;
}
