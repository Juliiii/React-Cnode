import React from 'react';
import BusinessCard from '../../components/BusinessCard';
import ListItem from '../../components/ListItem';
import { BackNavBar } from '../../components/NavBar';
import Loading from '../../components/Loading';
import { Tabs } from 'antd-mobile';
import { observer, inject } from 'mobx-react';
import { autorun } from 'mobx';

const TabPane = Tabs.TabPane;
@inject(({status, user, global}) => ({
  info: user.info,
  loading: status.loading,
  getInfo: user.getInfo,
  from: global.from,
  to: global.to
}))
@observer
class Homepage extends React.Component {
  componentWillMount () {
    const { loginname } = this.props.params;
    this.props.getInfo({loginname});
  }

  componentDidMount () {
    this.dispoer = autorun(() => {
      const reg = /\/user/;
      console.log(this.props.from, this.props.to);
      if (reg.test(this.props.from) && reg.test(this.props.to) && this.props.from !== this.props.to) {
        this.props.getInfo({loginname: this.props.to.split('/')[2]});
      }
    })
  }

  componentWillUnmount () {
    this.dispoer();
  }

  render () {
    const { info, loading } = this.props;
    if (loading) return <Loading />
    const recent_replies = info.recent_replies ? info.recent_replies : [];
    const recent_topics = info.recent_topics ? info.recent_topics : [];
    return (
      <div style={{height: '100%'}}>
        <BackNavBar title="个人主页" />
        <div style={{paddingTop: '.9rem'}}>
          <BusinessCard />
          <Tabs swipeable={false} defaultActiveKey="1">
            <TabPane tab="最近回复" key= "1" style={{paddingBottom: '.99rem'}}>
              {recent_replies.map(item => <ListItem item={item} key={item.id} />)}
            </TabPane>
            <TabPane tab="最近主题" key= "2" style={{paddingBottom: '.99rem'}}>
              {recent_topics.map(item => <ListItem item={item} key={item.id} />)}
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Homepage;
