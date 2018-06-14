import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StatusBox = styled.div`
  overflow: hidden;
  height: 100%;
  box-sizing: border-box;
`;

const StatusText = styled.div`
  font-family: Roboto;
  font-size: 1.5em;
  line-height: 2.5em;
  text-align: center;
  color: #FFF;
`;

const Status = styled.div`
  font-size: 0.75em;
  font-family: "Roboto";
  margin-bottom: 5px;
  float: left;
  width: 33.333333333%;
  height: 85px;
  background-color: rgba(39, 43, 53);
  box-sizing: border-box;
  margin: 5px;
  padding: 5px;
  color: #FFF;
  font-weight: 100;
  transition: 0.3s;
  cursor: pointer;
  border: 1px solid #201f1f;

  &:before {
    height: 15px;
    width: 15px;
    background-color: ${ props => props.online ? '#11fd11' : '#fb4747' };
    vertical-align: middle;
    border-radius: 50%;
    display: inline-block;
    margin-right: 0.4em;
    content: "";
  }

  &:hover {
    box-shadow: #2b2a2a 0px 5px 5px 0px;
    transform: translatey(3px);
  }

  ${ StatusText } {
    &:before {
      content: "${ props => props.online ? "Click! Disconnect" : "Click! Connect" }";
    }
  }
`;

class ProxyServer extends Component {
  static propTypes = {
    proxyServer: {
      status: PropTypes.bool
    },
    proxyConnected: {
      status: PropTypes.bool
    }
  };

  static defaultProps = {
    proxyServer: {
      status: false
    },
    proxyConnected: {
      status: false
    }
  };

  render() {
    return (
      <StatusBox>
        <Status online={this.props.proxyServer.status}>
          <span>Proxy Server</span>
          <StatusText></StatusText>
        </Status>

        <Status online={this.props.proxyConnected.status}>
          <span>Proxy Connected</span>
          <StatusText></StatusText>
        </Status>
      </StatusBox>
    );
  }
}

export default ProxyServer;