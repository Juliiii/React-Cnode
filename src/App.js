import React, { Component } from 'react';
import logo from './icons/logo.svg';
import './App.css';
import { Button, Icon } from 'antd-mobile';
class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='App'>
          <Icon type={require('./icons/logo.svg')} size="la"/>
          <h2 style={{
            fontSize: '17px'
          }}>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Button>Start</Button>
      </div>
    );
  }
}

export default App;
