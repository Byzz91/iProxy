import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

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

const activeAnimation = keyframes`
  0% { background-color: #044e04 }
  50% { background-color: #047704 }
  100% { background-color: #044e04 }
`;

const Status = styled.div`
  font-size: 0.75em;
  font-family: "Roboto";
  margin-bottom: 5px;
  float: left;
  width: 100%;
  height: 85px;
  background-color: rgba(39, 43, 53, 1);
  box-sizing: border-box;
  margin: 5px auto;
  padding: 5px;
  color: #FFF;
  font-weight: 100;
  transition: 0.3s;
  cursor: pointer;
  border: 1px solid #201f1f;
  animation: ${ props => props.online ? `${activeAnimation} 3.5s infinite` : "none" };
  box-sizing: border-box;

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
      content: "${ props => props.online ? "Click to Online!" : "Click! to Offline!" }";
    }
  }
`;

class ProxyStatus extends Component {
  // static propTypes = {
  //   proxyServer: PropTypes.shape({
  //     status: PropTypes.bool
  //   }),
  //   proxyConnected: PropTypes.shape({
  //     status: PropTypes.bool
  //   })
  // };

  static propTypes = {
    statusProxy: PropTypes.bool,
    statusConnected: PropTypes.bool
  };

  static defaultProps = {
    statusProxy: false,
    statusConnected: false
  };

  render() {
    return (
      <StatusBox>
        <Status online={this.props.statusProxy}>
          <span>Proxy Server</span>
          <StatusText></StatusText>
        </Status>

        {/*
        <Status 
          onClick={this.props.attachStatusConnected} 
          online={this.props.statusConnected}>
          <span>Proxy Connected</span>
          <StatusText></StatusText>
        </Status>
        */}
      </StatusBox>
    );
  }
}

export default ProxyStatus;