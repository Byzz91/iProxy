import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProxyConnector from './ProxyConnector';
import ProxyServer from './ProxyServer';

class Proxy extends Component {
  static propsTypes = {};
  static defaultProps = {};

  render() {
    return (
      <div>
        <ProxyServer />
        <ProxyConnector />
      </div>
    );
  }
}

export default Proxy;