import React from 'react';
import BusinessCard from '../../components/BusinessCard';
import ListItem from '../../components/ListItem';
import { BackNavBar } from '../../components/NavBar';
import Loading from '../../components/Loading';
import { Tabs } from 'antd-mobile';
import { user, global } from '../../store/actions';
import { connect } from 'react-redux';
const TabPane = Tabs.TabPane;

class Homepage extends React.Component {
  componentWillMount () {
    const { loginname } = this.props.params;
    this.props.getInfo(loginname);
  }

  componentWillReceiveProps ({to, from, change}) {
    if (!change) return;
    const reg = /\/user/;
    if (reg.test(from) && reg.test(to) && from !== to) {
      this.props.getInfo(to.split('/')[2]);      
      this.props.setChange();
    }
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
          <BusinessCard info={info} />
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

const mapDispatchToProps = (dispatch) => ({
  getInfo (loginname) {
    dispatch(user.getuserInfo(loginname));
  },
  setChange () {
    dispatch(global.setRouterChange(false));
  }
});

const mapStateToProps = (state, ownProps) => ({
  info: state.user.info,
  loading: state.status.loading,
  from: state.global.from,
  to: state.global.to,
  change: state.global.change
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);