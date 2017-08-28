import React from 'react'
import { InputItem, Button, Flex, Card, Icon } from 'antd-mobile';
import { browserHistory  } from 'react-router';
export const Login = (props) => {
  return(
    <Card direction="column" style={{height: '100%', width: '100%'}}>
      <Flex direction="column" style={{padding: '0.5rem 0'}}>
        <span>登录</span>
        <InputItem style={{width: '95%', padding: '0.5rem 0 0 0'}} placeholder="请输入access_token" />
        <Button type="primary" style={{width: '95%', marginTop: '0.5rem'}}>确定</Button>
        <Icon type={require('../../icons/close.svg')} style={{marginTop: '0.5rem'}} onClick={() => browserHistory.goBack()} />
      </Flex>
    </Card>
  );
};

export default Login;