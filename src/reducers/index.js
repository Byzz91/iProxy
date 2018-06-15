import { combineReducers } from 'redux';
import logger from './logger';
import statusProxy from './statusProxy';
import statusConnected from './statusConnected';

const reducers = combineReducers({
  logger,
  statusProxy,
  statusConnected
});

export default reducers;