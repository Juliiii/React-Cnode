import React from 'react'
import BusinessCard from '../../components/BusinessCard';
import { List, Icon, Badge, ActivityIndicator, Flex } from 'antd-mobile';
import { connect } from 'react-redux';
import { user } from '../../store/actions';
import { browserHistory } from 'react-router';


class Mine extends React.Component {

  componentWillMount () {
    if (!this.props.accesstoken) {
      browserHistory.push('/login');
    }
  }

  componentDidMount () {
    this.props.getInfo();
  }

  render () {
    const { info, logout, loading } = this.props;
    if (loading) return ( <Flex justify="center"><ActivityIndicator /></Flex> );
    return (
      <div>
        <BusinessCard info={info} />
        <List style={{marginTop: '1rem'}}>
          <List.Item 
            thumb={<Icon type={require('../../icons/document_fill.svg')} size="md" />} 
            arrow="horizontal"
          >最近话题</List.Item>
          <List.Item 
            thumb={<Icon type={require('../../icons/interactive_fill.svg')} size="md" />} 
            arrow="horizontal"
          >最近回复</List.Item>
          <List.Item 
            thumb={<Icon type={require('../../icons/remind_fill.svg')} size="md" />}
            arrow="horizontal"
            extra={<Badge text={88} overflowCount={99} />}
          >未读消息</List.Item>
          <List.Item 
            thumb={<Icon type={require('../../icons/undo.svg')} size="md" />}
            arrow="horizontal"
            onClick={logout}
          >登出</List.Item>
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    info: state.user.info,
    accesstoken: state.user.accesstoken,
    loading: state.user.loading
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getInfo: () => {
      dispatch(user.getuserInfo());
    },
    logout: () => {
      dispatch(user.logout());
      browserHistory.push('/');
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Mine)