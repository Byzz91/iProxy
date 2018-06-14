import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as log from '../actions/LogTypes';

const Logging = styled.div`
  background-color: rgba(39, 43, 53);
  height: 500px;
  box-sizing: border-box;
  min-height: 500px;
  max-height: 500px;
  font-size: 0.75em;
  overflow: hidden;
`;

const Line = styled.div`
  overflow: hidden;
  background-color: #24272e;
  color: #FFF;
  font-family: Roboto;
  line-height: 1.9em;
  font-size: 1.1em;

  &:before {
    display: block;
    float: left;
    text-align: right;
    width: 50px;
    color: #FFF;
    background-color: rgb(24, 29, 41);
    content: "${ props => props.idx }";
    margin-right: 10px;
    padding: 0 10px;
  }
`;

class ProxyLogging extends Component {
  static propTypes = {
    logs: PropTypes.array
  };

  static defaultProps = {
    logs: [
      { level: log.SYSTEM, message: "실행 준비 중입니다." },
    ]
  };

  render() {
    const printLogs = () => {
      return this.props.logs.map((log, idx) => {
        return (
          <Line key={idx} idx={idx + 1} level={log.level}>{log.message}</Line>
        );
      });
    };

    return (
      <div>
        <Logging>
          {printLogs()}
        </Logging>        
      </div>
    );
  }
}

export default ProxyLogging;