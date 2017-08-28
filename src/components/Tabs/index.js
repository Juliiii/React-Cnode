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
      defaultActiveKey="0"
      swipeable={false}
    >
      {
        Object.keys(tabs).map(
          (item, index) => <TabPane tab={item} key={index}>
                             <List />
                           </TabPane>
                            )
      }
    </Tabs>
  );
};

export default MyTabs;