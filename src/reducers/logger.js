import { LOGGING } from '../actions/ActionTypes'

const initialState = {
  logs: []
};

export default function logger(state = initialState, action) {
  switch (action.type) {
    case LOGGING:
      return {
        ...state,
        logs: [...state.logs, action.message]
      };
    default:
      return state;
  }
}