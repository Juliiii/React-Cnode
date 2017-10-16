import React from 'react'
import BusinessCard from '../../components/BusinessCard';
import Loading from '../../components/Loading';
import { SimpleNavbar } from '../../components/NavBar';
import { List, Icon, Toast } from 'antd-mobile';
import { inject, observer } from 'mobx-react';

@inject(({user, session, messages, routing, status}) => ({
  accesstoken: session.accesstoken,
  push: routing.push,
  logout () {
    session.logout();
    Toast.success('登出成功', 1);
    routing.push('/');
  },
  getInfo: user.getInfo,
  loading: status.loading
}))
@observer
class Mine extends React.Component {

  componentWillMount () {
    // if (!this.props.accesstoken) {
    //   this.props.push('/login');
    //   Toast.info('请先登录', 1);
    // } else {
    //   this.props.getInfo({});
    // }
    this.props.getInfo({});
  }

  render () {
    const { logout, loading, push } = this.props;
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
          <List.Item
            onClick={() => push('/mine/collection')} 
            thumb={<Icon type={require('../../icons/like_fill.svg')} size="md" />} 
          >我的收藏
          </List.Item>
          <List.Item 
            onClick={() => push('/mine/topic')} 
            thumb={<Icon type={require('../../icons/document_fill.svg')} size="md" />} 
          >最近话题
          </List.Item>
          <List.Item 
            onClick={() => push('/mine/reply')} 
            thumb={<Icon type={require('../../icons/interactive_fill.svg')} size="md" />} 
          >最近回复
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
