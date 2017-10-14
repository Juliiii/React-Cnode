import React from 'react';
import BusinessCard from '../../components/BusinessCard';
import { BackNavBar } from '../../components/NavBar';
import Loading from '../../components/Loading';
import RecentReplies from './components/RecentReplies';
import RecentTopics from './components/RecentTopics';
import { Tabs } from 'antd-mobile';
import { observer, inject } from 'mobx-react';
import { autorunAsync } from 'mobx';

const TabPane = Tabs.TabPane;
@inject(({status, user, global}) => ({
  loading: status.loading,
  getInfo: user.getInfo,
  from: global.from,
  to: global.to,
  changed: global.changed
}))
@observer
class Homepage extends React.Component {
  componentWillMount () {
    const { loginname } = this.props.params;
    this.props.getInfo({loginname});
    document.body.style.overflowY = 'auto';
  }

  componentDidMount () {
    this.dispoer = autorunAsync(() => {
      const reg = /\/user/;
      if (reg.test(this.props.from) && 
          reg.test(this.props.to) && 
          !this.props.changed && 
          this.props.from !== this.props.to) {
        this.props.getInfo({loginname: this.props.to.split('/')[2]});
        window.scrollTo(0, 0);
      }
    })
  }

  componentWillUnmount () {
    this.dispoer();
  }

  render () {
    const { loading } = this.props;
    if (loading) return <Loading />
    return (
      <div>
        <BackNavBar title="个人主页" />
        <div style={{paddingTop: '.9rem'}}>
          <BusinessCard />
          <Tabs swipeable={false} defaultActiveKey="1">
            <TabPane tab="最近回复" key= "1">
              <RecentReplies />
            </TabPane>
            <TabPane tab="最近主题" key= "2">
              <RecentTopics />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Homepage;
