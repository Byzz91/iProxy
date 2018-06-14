import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputContainer extends Component {
  static propTypes = {
    "proxies": PropTypes.Array
  };

  static defaultProps = {
    "proxies": [
      { "label": "Byzz", "proxy": "http://18.50.140.110:8722" }
    ]
  };

  render() {
    const renderProxies = (proxyArray) => {
      return proxyArray.map((one, index) => {
        return (
          <option value={one.proxy}>{one.label}</option>
        )
      });
    };

    return (
      <div>
        { this.props.proxies.length > 0 ? (<select>{renderProxies(this.props.proxies)}</select>) : "No Proxy :(" }  
      </div>
    );
  }
}

export default InputContainer;