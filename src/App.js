import React, { Component } from 'react';
import logo from './logo.svg';
import styles from './App.css';

class App extends Component {
  render() {
    console.log(styles);
    return (
      <div className={styles.App}>
        <div className='App'>
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
