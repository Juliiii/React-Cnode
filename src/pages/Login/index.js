import React from 'react'
import { InputItem, Button, Flex, Card, Icon } from 'antd-mobile';
import { inject, observer } from 'mobx-react';

@inject(({session, routing, status}) => ({
  submitting: status.submitting,
  canSubmit: session.canSubmit,
  accesstoken: session.accesstoken,
  changeInput: session.inputAccesstoken,
  login: session.login,
  clear: session.clear,
  push: routing.push,
  goBack: routing.goBack
}))
@observer
class Login extends React.Component {
  // link to home and clear the accesstoken

  componentWillMount () {
    if (this.props.accesstoken) {
      this.props.goBack();
    }
  }

  goBack = () => {
    this.props.clear();
    this.props.push('/');
  }

  render () {
    // canSubmit and submitting is for prevent users clicking again before finishing request
    // login is the method the submit the form to sever
    // changeInput is the method to change the observable
    const { canSubmit, submitting, login, changeInput } = this.props;
    return (
      <Card direction="column" style={{height: '100%', width: '100%'}}>
        <Flex direction="column" style={{padding: '0.5rem 0'}}>
          <span>登录</span>
          <InputItem style={{width: '95%', padding: '0.5rem 0 0 0'}} placeholder="请输入access_token" onChange={changeInput} />
          <Button 
            type="primary" 
            style={{width: '95%', marginTop: '0.5rem'}} 
            onClick={login} 
            disabled={!canSubmit || submitting}
          >
            { !submitting ? '确定' : '提交中...'}
          </Button>
         <Icon type={require('../../icons/close.svg')} style={{marginTop: '0.5rem'}} disabled={submitting} onClick={this.goBack} />
        </Flex>
      </Card>
    );
  };
};

export default Login;
