import React from 'react';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import routes from '../routes/Root';

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

const Root = (props) => {
  return (
    <Router history={history} onUpdate={() => onUpdate(props)} routes={routes} />
  );
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeTab: (value) => {
      dispatch(global.setTab(value));
    }
  };
}

export default connect(null, mapDispatchToProps)(Root);