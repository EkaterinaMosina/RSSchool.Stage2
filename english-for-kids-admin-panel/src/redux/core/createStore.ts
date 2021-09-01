import { Action, State } from './types';

export default function createStore(rootReducer: Function, initialState: Object) {
  let state: State = rootReducer(initialState, { type: '__INIT__' });

  const subscribers: Function[] = [];
  return {
    dispatch(action: Action) {
      state = rootReducer(state, action);
      subscribers.forEach((sub) => sub());
    },
    subscribe(callback: Function) {
      subscribers.push(callback);
    },
    getState() {
      return state;
    },
  };
}


