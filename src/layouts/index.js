import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Publish from '../pages/Publish';
import Main from '../pages/Main';
import Default from '../pages/Main/Default';
import Mine from '../pages/Mine';
import Login from '../pages/Login';
import Success from '../pages/Publish/Success';
import Detail from '../pages/Detail';


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
      <Route component={Detail} path="/detail/:id" />
    </Router>
  );
}

export default Layout;