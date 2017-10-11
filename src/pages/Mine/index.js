import React from 'react'
import BusinessCard from '../../components/BusinessCard';
import Loading from '../../components/Loading';
import { Link } from 'react-router';
import { SimpleNavbar } from '../../components/NavBar';
import { List, Icon, Badge, Toast } from 'antd-mobile';
import { inject, observer } from 'mobx-react';

@inject(({user, session, messages, routing, status}) => ({
  messageCount: messages.messageCount,
  accesstoken: session.accesstoken,
  push: routing.push,
  logout () {
    session.logout();
    Toast.success('登出成功', 1);
    routing.push('/');
  },
  getMessageCount: messages.getMessageCount,
  getInfo: user.getInfo,
  loading: status.loading
}))
@observer
class Mine extends React.Component {

  componentDidMount () {
    if (!this.props.accesstoken) {
      this.props.push('/login');
      Toast.info('请先登录', 1);
    } else {
      this.props.getInfo({});
      this.props.getMessageCount();
    }
  }

  render () {
    const { logout, loading, messageCount } = this.props;
    if (loading) return ( <Loading /> );
    return (
      <div
        style={{
          overflowY: 'auto'
        }}
      >
        <SimpleNavbar title="我" />
        <BusinessCard />
        <List style={{marginTop: '.2rem'}}>
          <Link to="/mine/collection">
            <List.Item 
              thumb={<Icon type={require('../../icons/like_fill.svg')} size="md" />} 
            >我的收藏
            </List.Item>
          </Link>
          <Link to="/mine/topic">
            <List.Item 
              thumb={<Icon type={require('../../icons/document_fill.svg')} size="md" />} 
            >最近话题
            </List.Item>
          </Link>
          <Link to="/mine/reply">
            <List.Item 
              thumb={<Icon type={require('../../icons/interactive_fill.svg')} size="md" />} 
            >最近回复
            </List.Item>
          </Link>
          <List.Item 
            thumb={<Icon type={require('../../icons/remind_fill.svg')} size="md" />}
            extra={<Badge text={messageCount} overflowCount={99} />}
          >未读消息
          </List.Item>
          <List.Item 
            onClick={logout}
            thumb={<Icon type={require('../../icons/logout.svg')} size="md" />}
          >登出
          </List.Item>
        </List>
      </div>
    );
  }
}

export default Mine;
