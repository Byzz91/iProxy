import { STATUS_PROXY_CONNECTED } from '../actions/ActionTypes';

const initialState = {
  status: false
};

export default function statusConnected(state = initialState, action) {
  switch (action.type) {
    case STATUS_PROXY_CONNECTED:
      return {
        status: action.status
      };
    default:
      return state;
  }
}