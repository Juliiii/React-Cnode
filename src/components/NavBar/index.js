import React from 'react'
import { NavBar, Icon } from 'antd-mobile';
import { browserHistory } from 'react-router';


const MyNavBar = (props) => (
  <NavBar
    leftContent={<Icon type={require('../../icons/return.svg')} />}
    mode="light"
    style={{
      position: 'fixed',
      width: '100%',
      top: '0',
      left: '0',
      zIndex: '999'
    }}
    iconName={null}
    onLeftClick={() => browserHistory.goBack()}
  >{props.title}
  </NavBar>
);

export default MyNavBar;