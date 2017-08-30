import React from 'react'
import { InputItem, Button, Flex, Card, Icon } from 'antd-mobile';
import { browserHistory  } from 'react-router';
import { connect } from 'react-redux';
import { user } from '../../store/actions';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      value: ''
    }
  }

  componentDidMount () {
    if (this.props.accesstoken) {
      browserHistory.goBack();
    }
  }


  onChange = (value) => {
    this.setState({
      value,
      canSubmit: !!value
    });
  }

  login = () => {
    this.props.login(this.state.value);
  }


  render () {
    const { submitting } = this.props;
    const { canSubmit } = this.state;
    return (
      <Card direction="column" style={{height: '100%', width: '100%'}}>
        <Flex direction="column" style={{padding: '0.5rem 0'}}>
          <span>登录</span>
          <InputItem style={{width: '95%', padding: '0.5rem 0 0 0'}} placeholder="请输入access_token" onChange={this.onChange} />
          <Button 
            type="primary" 
            style={{width: '95%', marginTop: '0.5rem'}} 
            onClick={this.login} 
            disabled={ !canSubmit || submitting }
          >
            { !submitting ? '确定' : '提交中...'}
          </Button>
          <Icon type={require('../../icons/close.svg')} style={{marginTop: '0.5rem'}} onClick={() => browserHistory.push('/')} disabled={submitting} />
        </Flex>
      </Card>
    );
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (accesstoken) => {
      dispatch(user.login(accesstoken));
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    submitting: state.user.submitting,
    accesstoken: state.user.accesstoken
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);