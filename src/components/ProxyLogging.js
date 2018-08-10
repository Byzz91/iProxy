import React, { Component } from 'react';
import styled from 'styled-components';

const Logging = styled.div`
  background-color: rgba(39, 43, 53, 1);
  box-sizing: border-box;
  height: 100%;
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
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

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
  windowLogging;

  componentWillUpdate() {
    this.windowLogging.scrollTop = this.windowLogging.scrollHeight;
  }

  render() {
    const renderList = () => {
      return this.props.logs.map((item, idx) => {
        return (
          <Line 
            key={idx} 
            idx={idx + 1} 
            level={item.level} 
            dangerouslySetInnerHTML={ {__html: item.message} }
          >
          </Line>
        );
      });
    };
  
    return (
      <Logging innerRef={ (el) => { this.windowLogging = el; } }>
        { renderList() }
      </Logging>        
    );
  }
}

export default ProxyLogging;