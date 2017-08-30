import React from 'react'
import List from '../List';
import { Tabs } from 'antd-mobile';
import { connect } from 'react-redux';
import { topics } from '../../store/actions';
const TabPane = Tabs.TabPane;
const tabs = {
  '全部': 'all',
  '精华': 'good',
  '分享': 'share',
  '问答': 'ask',
  '招聘': 'job',
  '测试': 'dev'
};

export const MyTabs = ({tab, changeTab}) => {
  return(
    <Tabs 
      defaultActiveKey={tab}
      swipeable={false}
      onChange={changeTab}
    >
      {
        Object.entries(tabs).map(
          (item, index) => <TabPane tab={item[0]} key={item[1]}>
                             <List tab={tab} />
                           </TabPane>
                            )
      }
    </Tabs>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    tab: state.topics.tab
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeTab: (tab) => {
      dispatch(topics.changeTab(tab));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTabs);