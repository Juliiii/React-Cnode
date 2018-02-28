import React from 'react';
import { Router } from 'react-router';
import routes from '../routes/Root';
import routing, { history } from '../store/routing';
import global from '../store/global';
import session from '../store/session';
import { Toast } from 'antd-mobile';


//路径与对应的底部tab的映射表
export const RouteTabMap = {
  '/': 'home',
  '/publish': 'publish',
  '/message': 'message',
  '/mine': 'mine'
}

history.listen(location => {
  const currentPathname = location.pathname;
  // 路由变化时，记录旧新路由
  global.updateRouteTable(currentPathname);
  // 根据页面不同，决定整个页面是否可以滚动
  const hiddenList = ['/', '/message']; 
  if (hiddenList.some(pathname => pathname === currentPathname)) {
    document.body.style.overflowY = 'hidden';
  } else {
    document.body.style.overflowY = 'auto';
  }
  // 根据页面和登录状态，限制用户进入页面的权限
  const shouldAuth = [/publish/, /mine/, /message/];
  const hadAuth = [/login/];
  shouldAuth.forEach(reg => {
    if (reg.test(currentPathname) && !session.accesstoken) {
      Toast.info('请先登录', 1);
      routing.replace('/login');
    }
  });
  hadAuth.forEach(reg => {
    if (reg.test(currentPathname) && session.accesstoken) {
      Toast.info('已经登录', 1);
      routing.goBack();
    }
  });

  //路由切换时确保底部当前tab与路由一致
  let correspondTab = RouteTabMap[currentPathname]
  if(correspondTab && global.tab !== correspondTab) {
    global.updateVal('tab', correspondTab)
  }

})

const Root = (props) => {
  return (
    <Router history={history} routes={routes} />
  );
}

export default Root;
