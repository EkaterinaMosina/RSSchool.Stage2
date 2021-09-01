import { INIT_STATE_STORE } from '../constants';
import createStore from './createStore';
import rootReducer from '../rootReducer';

export const store = createStore(rootReducer, INIT_STATE_STORE);

