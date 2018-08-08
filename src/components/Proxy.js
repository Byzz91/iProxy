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
    handleAddLog        : (message) => { dispatch(actions.addLog(message)); }
  }
};

class Proxy extends Component {
  proxyServer;
  proxyConnector;

  constructor(props) {
    super(props);
    this.attachStatusConnected = this.attachStatusConnected.bind(this);
    this.attachProxyServer = this.attachProxyServer.bind(this);
    this.collectLogs = this.collectLogs.bind(this);

    this.proxyConnector = new ProxyConnector('win32');
    this.proxyConnector.setProxyAddress(`http://${ ip.address() }:8722`);
  }

  componentDidMount() {
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
      this.collectLogs();
    }, 500);
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

  attachProxyServer() {
    // this.props.handleProxyServer(true);
  }

  render() {
    return (
      <div>
        <AppHeader>
          <ProxyStatus
            statusProxy={this.props.statusProxy}
            statusConnected={this.props.statusConnected}

            attachStatusConnected={this.attachStatusConnected}
            attachProxyServer={this.attachProxyServer}
          />
        </AppHeader>
        <ProxyLogging logs={this.props.logs} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Proxy);