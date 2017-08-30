import React from 'react'
import List from '../List';
import { Tabs } from 'antd-mobile';
const TabPane = Tabs.TabPane;
const tabs = {
  '全部': 'all',
  '精华': 'good',
  '分享': 'share',
  '问答': 'ask',
  '招聘': 'job',
  '测试': 'dev'
};

export const MyTabs = (props) => {
  return(
    <Tabs 
      defaultActiveKey="all"
      swipeable={false}
    >
      {
        Object.entries(tabs).map(
          (item, index) => <TabPane tab={item[0]} key={item[1]}>
                             <List />
                           </TabPane>
                            )
      }
    </Tabs>
  );
};

export default MyTabs;