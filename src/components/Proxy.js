import React, { Component } from 'react';
import ProxyLogging from './ProxyLogging';
import ProxyStatus from './ProxyStatus';
import styled from 'styled-components';

const AppHeader = styled.div`
  margin: 0;
  padding: 10px 10px;
  height: 100px;
`;

class Proxy extends Component {
  render() {
    return (
      <div>
        <AppHeader>
          <ProxyStatus />
        </AppHeader>
        
        <ProxyLogging />
      </div>
    );
  }
}

export default Proxy;