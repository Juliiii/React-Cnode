import React from 'react'
import { NavBar, Icon } from 'antd-mobile';
import { browserHistory } from 'react-router';

export const BackNavBar = ({title}) => (
  <NavBar
    leftContent={<Icon type={require('../../icons/return.svg')} />}
    mode="dark"
    style={{
      position: 'fixed',
      width: '100%',
      height: '0.87rem',
      top: '0',
      left: '0',
      zIndex: '999'
    }}
    iconName={null}
    onLeftClick={() => browserHistory.goBack()}
  >{title}
  </NavBar>
);

export const SimpleNavbar = ({title, mode = 'dark'}) => (
  <div 
    style= {{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '87px',
      backgroundColor: mode === 'dark' ? '#3a40f5' : '#fff',
      color: mode === 'dark' ? '#fff' : '#333',
      fontSize: '0.36rem'
    }}
  >{title}
  </div>
)