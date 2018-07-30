import React, { Component } from 'react';
import ProxyLogging from './ProxyLogging';
import ProxyStatus from './ProxyStatus';
import styled from 'styled-components';
import ip from 'ip';

import { connect } from 'react-redux';
import * as actions from '../actions';

import ProxyConnector from '../app_modules/proxy-connector';
import ProxyServer from '../app_modules/proxy-server';

const AppHeader = styled.div`
  margin: 0;
  padding: 10px 10px;
  height: 100px;
`;

const mapStateToProps = (state) => {
  return {
    statusProxy: state.statusProxy.status,
    statusConnected: state.statusConnected.status,
    logs: state.logger.logs
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleProxyServer: (status) => { dispatch(actions.setProxyServer(status)); },
    handleProxyConnected: (status) => { dispatch(actions.setProxyConnected(status)); },
    handleAddLog: (level, message) => { dispatch(actions.addLog(level, message)); }
  }
};

class Proxy extends Component {
  proxyConnector;

  constructor(props) {
    super(props);
    this.attachStatusConnected = this.attachStatusConnected.bind(this);

    this.proxyConnector = new ProxyConnector('win32');
    this.proxyConnector.setProxyAddress(`http://${ ip.address() }:8722`);
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