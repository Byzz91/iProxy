import * as types from './ActionTypes';

export function setProxyServer(status) {
  return {
    type: types.STATUS_PROXY_SERVER,
    status
  }
}

export function setProxyConnected(status) {
  return {
    type: types.STATUS_PROXY_CONNECTED,
    status
  }
}

export function addLog(level, message) {
  return {
    type: types.LOGGING,
    log: { level, message }
  }
}