import { LOGGING, LOGGING_CLEAR } from '../actions/ActionTypes'

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
    case LOGGING_CLEAR:
      return {
        ...state,
        logs: []
      }
    default:
      return state;
  }
}