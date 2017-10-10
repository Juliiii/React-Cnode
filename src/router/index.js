import React from 'react';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'mobx-react-router';
import routes from '../routes/Root';
import routingStore from '../store/routing';
import global from '../store/global';

const history = syncHistoryWithStore(browserHistory, routingStore);

history.listen(location => {
  global.updateRouteTable(location.pathname);
})

const Root = (props) => {
  return (
    <Router history={history} routes={routes} />
  );
}

export default Root;
