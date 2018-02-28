import React from 'react'
import List from '../../components/List';
import ListItem from '../../components/ListItem';
import { Tabs } from 'antd-mobile';
import { observer, inject } from 'mobx-react';
const TabPane = Tabs.TabPane;
const tabs = {
    all: '全部',
    good: '精华',
    share: '分享',
    ask: '问答',
    job: '招聘'
}
@inject(({topics, status}) => ({
  loading: status.loading,
  refreshing: status.refreshing,
  reachEnd: topics.reachEnd,
  data: topics.data,
  type: topics.type,
  firstcome: topics.firstcome,
  changeType: topics.changeType,
  getData: topics.loadData,
  refresh: topics.refresh,
  setFirstCome: topics.setFirstCome
}))
@observer
class MyTabs extends React.Component {
  componentWillUnmount () {
    this.props.setFirstCome(true);
  }

  changeType = (value) => {
    if (this.props.firstCome) this.props.setFirstCome(false);
    const { loading, refreshing, changeType } = this.props;
    if (loading || refreshing) return;
    changeType(value);
  }

  saveScrollTop = (value) => {
    localStorage.setItem('scrollTop', value);
  }

  render () {
    const { type } = this.props;
    return (
      <div>
        <Tabs 
          activeKey={type}
          defaultActiveKey={type}
          swipeable={false}
          className="mainpageTab"
          animated
          destroyInactiveTabPane
          onChange={this.changeType}
        >
          {
            Object.entries(tabs).map((item) =>
              (<TabPane tab={item[1]} key={item[0]}>
                  <List {...this.props}
                        saveScrollTop={this.saveScrollTop}
                        ListItem={ListItem}
                  />
               </TabPane>))
          }
        </Tabs>
      </div>
    );
  }
};

export default MyTabs;
