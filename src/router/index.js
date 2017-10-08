import React from 'react';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'mobx-react-router';
import routes from '../routes/Root';
import routingStore from '../store/routing';

// import { connect } from 'react-redux';
// import store from '../store';
// import { global } from '../store/actions';

const onUpdate = ({changeTab}) => {
  const {pathname} = window.location;
  console.log(pathname);
  // switch (pathname) {
  //   case '/': changeTab('home'); break;
  //   case '/mine': changeTab('mine'); break;
  //   case '/publish': changeTab('publish'); break;
  //   default: break;
  // }
}

const history = syncHistoryWithStore(browserHistory, routingStore);

const Root = (props) => {
  return (
    <Router history={history} onUpdate={() => onUpdate(props)} routes={routes} />
  );
}

export default Root;

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     changeTab: (value) => {
//       dispatch(global.setTab(value));
//     }
//   };
// }

// export default connect(null, mapDispatchToProps)(Root);