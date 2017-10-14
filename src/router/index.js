import React from 'react';
import { Router } from 'react-router';
import routes from '../routes/Root';
import { history } from '../store/routing';
import global from '../store/global';

const hiddenList = ['/', '/message']; 

history.listen(location => {
  global.updateRouteTable(location.pathname);
  if (hiddenList.some(pathname => pathname === location.pathname)) {
    document.body.style.overflowY = 'hidden';
  } else {
    document.body.style.overflowY = 'auto';
  }
})

const Root = (props) => {
  return (
    <Router history={history} routes={routes} />
  );
}

export default Root;
