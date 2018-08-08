import React, { Component } from 'react';
import styled from 'styled-components';

const Logging = styled.div`
  background-color: rgba(39, 43, 53, 1);
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
  render() {
    const renderList = () => {
      let count = this.props.logs.length;

      return this.props.logs.reverse().map((item, idx) => {
        return (
          <Line key={idx} idx={count - idx} level={item.level}>{item.message}</Line>
        );
      });
    };
  
    return (
      <div>
        <Logging>
          { renderList() }
        </Logging>        
      </div>
    );
  }
}

export default ProxyLogging;