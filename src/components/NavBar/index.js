import React from 'react'
import { NavBar, Icon } from 'antd-mobile';
import { browserHistory } from 'react-router';


const MyNavBar = (props) => (
  <NavBar
    leftContent={<Icon type={require('../../icons/return.svg')} />}
    mode="light"
    iconName={null}
    onLeftClick={() => browserHistory.goBack()}
  >{props.title}
  </NavBar>
);

export default MyNavBar;