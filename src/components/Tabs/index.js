import React from 'react'
import { Tabs } from 'antd-mobile';
import { colors } from '../../constants';
const TabPane = Tabs.TabPane;
const tabs = {
  '全部': 'all',
  '精华': 'good',
  '分享': 'share',
  '问答': 'ask',
  '招聘': 'job',
  '测试': 'dev'
};

class Test extends React.Component {

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    console.log('created');
  }

  render () {
    return (
      <div>12323232</div>
    );
  }
};


export const MyTabs = (props) => {
  return(
    <Tabs 
      defaultActiveKey="1"
    >
      {
        Object.keys(tabs).map(
          (item, index) => <TabPane tab={item} key={index}>
                             <Test />
                            </TabPane>
                            )
      }
    </Tabs>
  );
};

export default MyTabs;