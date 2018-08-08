import { 
  STATUS_PROXY_SERVER
} from '../actions/ActionTypes';

const initialState = {
  status: true
};

export default function statusProxy(state = initialState, action) {
  switch (action.type) {
    case STATUS_PROXY_SERVER:
      return {
        status: action.status
      };
    default:
      return state;
  }
}