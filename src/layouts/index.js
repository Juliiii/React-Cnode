import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import Publish from '../pages/Publish';
import Main from '../pages/Main';
import Default from '../pages/Main/Default';
import Mine from '../pages/Mine';
import Login from '../pages/Login';
import Success from '../pages/Publish/Success';
import Detail from '../pages/Detail';
import { connect } from 'react-redux';
import store from '../store';
import { global } from '../store/actions';

const onUpdate = ({changeTab}) => {
  const {pathname} = window.location;
  switch (pathname) {
    case '/': changeTab('home'); break;
    case '/mine': changeTab('mine'); break;
    case '/publish': changeTab('publish'); break;
    default: break;
  }
}

const history = syncHistoryWithStore(browserHistory, store);

const Layout = (props) => {
  return (
    <Router history={history} onUpdate={() => onUpdate(props)}>
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeTab: (value) => {
      dispatch(global.setTab(value));
    }
  };
}

export default connect(null, mapDispatchToProps)(Layout);