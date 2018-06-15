import { LOGGING } from '../actions/ActionTypes'

const initialState = {
  logs: []
};

export default function logger(state=initialState, action) {
  switch (action.type) {
    case LOGGING:
      return {
        logs: state.logs.push(action.log)
      };
    default:
      return state;
  }
}