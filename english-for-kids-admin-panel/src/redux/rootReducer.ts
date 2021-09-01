import { CHANGE_MODE, SELECT_TOPIC, ADD_STATISTICS, ADD_CARD_ACTION, SELECT_ADMIN_TOPIC, SELECT_ADMIN_MODE, UPDATE_CARDS } from './actions/actionTypes';
import { Action, State } from './core/types';

export default function rootReducer(state: State, { type, payload }: Action): State {
  
  switch (type) {
    
    case CHANGE_MODE: {
      const { mode } = payload;
      if (mode) {
        return { ...state, mode }; 
      }
    }

    case SELECT_TOPIC: {
      const { topic } = payload;
      if (topic) {
        return { ...state, topic };
      }
    }

    case ADD_STATISTICS: {
      const { statData } = payload;
      if (statData) {
        return {
          ...state,
          statistics: statData,
        };
      }
    }

    case ADD_CARD_ACTION: {
      const { statistics } = state;
      const { key, data } = payload;

      if (key && data) {
        return {
          ...state,
          statistics:  {
            ...statistics,
            [key] : data,
          },
        };
      }
    }

    case SELECT_ADMIN_TOPIC: {
      const { adminTopic } = payload;
      if (adminTopic) {
        return { ...state, adminTopic };
      }
    }

    case SELECT_ADMIN_MODE: {
      const { adminMode } = payload;
      if (adminMode) {
        return { ...state, adminMode };
      }
    }

    case UPDATE_CARDS: {
      const { cards } = payload;
      if (cards) {
        return { ...state, cards };
      }
    }

    default:
      return state;
  }
}
