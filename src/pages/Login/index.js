import React from 'react'
import { InputItem, Button, Flex, Card, Icon } from 'antd-mobile';
// import { replace } from 'react-router-redux';
// import { connect } from 'react-redux';
// import { user } from '../../store/actions';
import { inject, observer } from 'mobx-react';

@inject(({session, routing}) => ({
  submitting: session.submitting,
  canSubmit: session.canSubmit,
  accesstoken: session.accesstoken,
  changeInput: (value) => session.inputAccesstoken(value),
  login: () => session.login(),
  clear: () => session.clear(),
  toHome: () => routing.goBack()
}))
@observer
class Login extends React.Component {
  // change accesstoken when input
  onChange = (value) => {
    this.props.changeInput(value);
  }
  // login
  login = () => {
    this.props.login();
  }
  // link to home and clear the accesstoken
  toHome = () => {
    this.props.clear();
    this.props.toHome();
  }

  render () {
    // canSubmit and submitting is for prevent users clicking again before finishing request
    const { canSubmit, submitting } = this.props;
    return (
      <Card direction="column" style={{height: '100%', width: '100%'}}>
        <Flex direction="column" style={{padding: '0.5rem 0'}}>
          <span>登录</span>
          <InputItem style={{width: '95%', padding: '0.5rem 0 0 0'}} placeholder="请输入access_token" onChange={this.onChange} />
          <Button 
            type="primary" 
            style={{width: '95%', marginTop: '0.5rem'}} 
            onClick={this.login} 
            disabled={!canSubmit || submitting}
          >
            { !submitting ? '确定' : '提交中...'}
          </Button>
         <Icon type={require('../../icons/close.svg')} style={{marginTop: '0.5rem'}} disabled={submitting} onClick={this.toHome} />
        </Flex>
      </Card>
    );
  };
};

export default Login;

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     login: (accesstoken) => {
//       dispatch(user.login(accesstoken));
//     },
//     toHome: () => {
//       dispatch(replace('/'));
//     }
//   };
// };

// const mapStateToProps = (state, ownProps) => {
//   return {
//     submitting: state.status.submitting,
//     accesstoken: state.status.accesstoken
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Login);