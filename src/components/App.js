import React, { Component } from 'react';
import Proxy from './Proxy';
import { injectGlobal } from 'styled-components';

injectGlobal`
  html {
    height: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    background-color: rgba(43, 48, 59, 1);
    overflow: hidden;
    height: 100%;
  }
  #root {
    height: 100%;
  }
`;

class App extends Component {
  render() {
    return (
      <Proxy />
    );
  }
}

export default App;