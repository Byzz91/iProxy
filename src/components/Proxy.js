import React, { Component } from 'react';
import ProxyLogging from './ProxyLogging';
import * as LOG_TYPES from '../actions/LogTypes';
import ProxyStatus from './ProxyStatus';
import styled from 'styled-components';
import ip from 'ip';

import { connect } from 'react-redux';
import * as actions from '../actions';

import ProxyConnector from '../app_modules/proxy-connector';
const ipcRenderer = window.require('electron').ipcRenderer;

const AppWrapper = styled.div`
  height: 100%;
`;

const AppHeader = styled.div`
  margin: 0;
  padding: 10px 10px;
  height: 100px;
`;

const mapStateToProps = (state) => {
  return {
    statusProxy    : state.statusProxy.status,
    statusConnected: state.statusConnected.status,
    logs           : state.logger.logs
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleProxyServer   : (status) => { dispatch(actions.setProxyServer(status)); },
    handleProxyConnected: (status) => { dispatch(actions.setProxyConnected(status)); },
    handleAddLog        : (message) => { dispatch(actions.addLog(message)); },
    handleClearLog      : () => { dispatch(actions.clearLog()); }
  }
};

class Proxy extends Component {
  proxyServer;
  proxyConnector;

  constructor(props) {
    super(props);

    this.attachStatusConnected = this.attachStatusConnected.bind(this);
    this.collectLogs = this.collectLogs.bind(this);

    this.proxyConnector = new ProxyConnector('win32');
    this.proxyConnector.setProxyAddress(`http://${ ip.address() }:8722`);
  }

  componentDidMount() {
    this.props.handleAddLog({
      level: LOG_TYPES.SYSTEM,
      message: `프록시 서버가 실행되었습니다.`
    });

    this.props.handleAddLog({
      level: LOG_TYPES.SYSTEM,
      message: `Proxy Server - ${ip.address()}:8722`
    });

    this.props.handleAddLog({
      level: LOG_TYPES.SYSTEM,
      message: `Mirror Host - 192.168.50.5 (fixed)`
    });

    ipcRenderer.on('sending-logs', (event, logs) => {
      if (logs.length) {
        for (let idx in logs) {
          this.props.handleAddLog({
            level: LOG_TYPES.SYSTEM,
            message: logs[idx]
          });
        }
      }
    });

    setInterval(() => {
      if (this.props.logs.length > 30000) {
        this.props.handleClearLog();
      } else {
        this.collectLogs();
      }
    }, 50);
  }

  collectLogs() {
    ipcRenderer.send('bring-logs', {});
  }

  attachStatusConnected() {
    if (this.props.statusConnected === false) {
      this.proxyConnector.enable();
      this.props.handleProxyConnected(true);
    } else {
      this.proxyConnector.disable();
      this.props.handleProxyConnected(false);
    }
  }

  render() {
    return (
      <AppWrapper>
        <AppHeader>
          <ProxyStatus
            statusProxy={this.props.statusProxy}
            statusConnected={this.props.statusConnected}

            attachStatusConnected={this.attachStatusConnected}
          />
        </AppHeader>
        <ProxyLogging logs={this.props.logs} />
      </AppWrapper>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Proxy);