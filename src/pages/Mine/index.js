import React from 'react'
import BusinessCard from '../../components/BusinessCard';
import Loading from '../../components/Loading';
import { SimpleNavbar } from '../../components/NavBar';
import { List, Icon, Badge, Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import { user, global } from '../../store/actions';
import { push } from 'react-router-redux';

class Mine extends React.Component {

  componentDidMount () {
    if (!this.props.accesstoken) {
      this.props.changeUrl('/login');
    } else {
      this.props.getInfo();
      this.props.getMessageCount();
    }
  }

  render () {
    const { info, logout, loading, messageCount, changeUrl } = this.props;
    if (loading) return ( <Loading /> );
    return (
      <div
        style={{
          overflowY: 'auto'
        }}
      >
        <SimpleNavbar title="我" />
        <BusinessCard info={info} />
        <List style={{marginTop: '.2rem'}}>
          <List.Item 
            thumb={<Icon type={require('../../icons/like_fill.svg')} size="md" />} 
            onClick={() => changeUrl('/mine/collection')}
          >我的收藏
          </List.Item>
          <List.Item 
            thumb={<Icon type={require('../../icons/document_fill.svg')} size="md" />} 
            onClick={() => changeUrl('/mine/topic')}
          >最近话题
          </List.Item>
          <List.Item 
            thumb={<Icon type={require('../../icons/interactive_fill.svg')} size="md" />} 
            onClick={() => changeUrl('/mine/reply')}
          >最近回复
          </List.Item>
          <List.Item 
            thumb={<Icon type={require('../../icons/remind_fill.svg')} size="md" />}
            extra={<Badge text={messageCount} overflowCount={99} />}
          >未读消息
          </List.Item>
          <List.Item 
            thumb={<Icon type={require('../../icons/logout.svg')} size="md" />}
            onClick={logout}
          >登出
          </List.Item>
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    info: state.user.info,
    accesstoken: state.user.accesstoken,
    loading: state.status.loading,
    messageCount: state.user.messageCount
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getInfo: () => {
      dispatch(user.getuserInfo());
    },
    getMessageCount: () => {
      dispatch(user.getMessageCount());
    },
    logout: () => {
      dispatch(global.setTab('home'));
      dispatch(user.logout());
      Toast.info('登出成功', 1);
      dispatch(push('/'))
    },
    changeUrl: (url) => {
      dispatch(push(url));
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Mine)