import React from 'react'
import List from '../../components/List';
import ListItem from '../../components/ListItem';
import { Tabs } from 'antd-mobile';
import { observer, inject } from 'mobx-react';
const TabPane = Tabs.TabPane;
const tabs = {
  '全部': 'all',
  '精华': 'good',
  '分享': 'share',
  '问答': 'ask',
  '招聘': 'job'
};
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

  componentDidMount () {
    this.props.getData();
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
            Object.entries(tabs).map((item, index) => 
              (<TabPane tab={item[0]} key={item[1]}>
                  <List {...{...this.props, saveScrollTop: this.saveScrollTop, ListItem}} />
               </TabPane>))
          }
        </Tabs>
      </div>
    );
  }
};

export default MyTabs;
