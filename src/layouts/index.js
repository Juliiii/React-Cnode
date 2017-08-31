import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Publish from '../pages/Publish';
import Main from '../pages/Main';
import Default from '../pages/Main/Default';
import Mine from '../pages/Mine';
import Login from '../pages/Login';
import Success from '../pages/Publish/Success';

const Layout = () => {
  return (
    <Router history={browserHistory}>
      <Route component={Main} path="/">
        <IndexRoute component={Default} />
        <Route component={Publish} path="publish" />
        <Route component={Success} path="success" />
        <Route component={Mine} path="mine" />
      </Route>
      <Route component={Login} path="/login" />
    </Router>
  );
}

export default Layout;