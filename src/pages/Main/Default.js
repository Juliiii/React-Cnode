import React from 'react'
import List from '../../components/List';
import ListItem from '../../components/ListItem';
import { Tabs } from 'antd-mobile';
import { observer, inject } from 'mobx-react';
// import { connect } from 'react-redux';
// import { topics } from '../../store/actions';
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
  tab: topics.tab,
  firstcome: topics.firstcome,
  changeTab (val) {
    topics.changeTab(val);
  },
  getData () {
    topics.loadData();
  },
  refresh () {
    topics.refresh();
  },
  setFirstCome (val) {
    topics.setFirstCome(val);
  }
}))
@observer
class MyTabs extends React.Component {

  constructor (props) {
    super(props);
    document.body.style.overflowY = 'hidden';
  }


  componentDidMount () {
    const { data, getData } = this.props;
    if (data.length === 0) {
      getData();
    }
  }

  componentWillUnmount () {
    this.props.setFirstCome(true);
  }

  changeTab = (value) => {
    if (this.props.firstCome) this.props.setFirstCome(false);
    const { loading, refreshing, changeTab } = this.props;
    if (loading || refreshing) return;
    changeTab(value);
  }

  saveScrollTop = (value) => {
    localStorage.setItem('scrollTop', value);
  }

  render () {
    const { tab } = this.props;
    return (
      <div>
        <Tabs 
          activeKey={tab}
          defaultActiveKey={tab}
          swipeable={false}
          className="mainpageTab"
          animated
          destroyInactiveTabPane
          onChange={this.changeTab}
        >
          {
            Object.entries(tabs).map((item, index) => 
              (<TabPane tab={item[0]} key={item[1]} style={{paddingBottom: '99px'}}>
                  <List {...{...this.props, saveScrollTop: this.saveScrollTop, ListItem}} />
               </TabPane>))
          }
        </Tabs>
      </div>
    );
  }
};

export default MyTabs;

// const mapStateToProps = (state, ownProps) => {
//   return {
//     tab: state.topics.tab,
//     data: state.topics.data,
//     loading: state.status.loading,
//     refresh: state.status.refresh,
//     reachEnd: state.status.reachEnd
//   };
// }

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     changeTab: (tab) => {
//       dispatch(topics.changeTab(tab));
//     },
//     getData: () => {
//       dispatch(topics.getTopics());
//     },
//     onRefresh: () => {
//       dispatch(topics.refresh());
//     }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(MyTabs);