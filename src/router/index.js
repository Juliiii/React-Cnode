import React from 'react';
import { Router } from 'react-router';
import routes from '../routes/Root';
import { history } from '../store/routing';
import global from '../store/global';


history.listen(location => {
  global.updateRouteTable(location.pathname);
})

const Root = (props) => {
  return (
    <Router history={history} routes={routes} />
  );
}

export default Root;
