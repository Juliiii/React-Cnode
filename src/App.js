import React, { Component } from 'react';
import ListItem from './components/ListItem';
import TabBar from './components/TabBar';
import Tabs from './components/Tabs';
import { Router, Route, browserHistory } from 'react-router';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <TabBar />
        <Tabs />
        {this.props.children}
      </div>
    );
  }
}


const router = () => {
  return (
    <Router history={browserHistory}>
      <Route component={App} path="/">
        <Route component={ListItem} path="list" />
      </Route>
    </Router>
  );
}

export default router;
