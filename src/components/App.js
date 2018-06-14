import React, { Component } from 'react';
import Proxy from './Proxy';
import { injectGlobal } from 'styled-components';

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    background-color: rgba(43, 48, 59);
  }
`;

class App extends Component {
  render() {
    return (
      <div>
        <Proxy />
      </div>
    );
  }
}

export default App;