import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Icon, TabBar } from 'antd-mobile';
import { colors } from '../../constants';

class Main extends React.Component {
  render () {
    const { changeUrl, tab, children } = this.props;
    return (
      <div>
        <TabBar
          unselectedTintColor="#949494"
          tintColor={colors.blue}
          barTintColor="white"
          hidden={false}
        >
          <TabBar.Item
            icon={<Icon type={require('../../icons/homepage.svg')} size="md" />}
            selectedIcon={<Icon type={require('../../icons/homepage_fill.svg')} size="md" />}
            title="主页"
            key="主页"
            selected={tab === 'home'}
            onPress={() => {
              changeUrl('/');
            }}
          />
          <TabBar.Item
            icon={<Icon type={require('../../icons/brush.svg')} size="md" />}
            selectedIcon={<Icon type={require('../../icons/brush_fill.svg')} size="md" />}
            title="发帖"
            key="发帖"
            selected={tab === 'publish'}
            onPress={() => {
              changeUrl('/publish');
            }}
          />
          <TabBar.Item
            icon={<Icon type={require('../../icons/people.svg')} size="md" />}
            selectedIcon={<Icon type={require('../../icons/people_fill.svg')} size="md" />}
            title="我的"
            key="我的"
            selected={tab === 'mine'}
            onPress={() => {
              changeUrl('/mine');
            }}
          />
        </TabBar>
        {children}
      </div>
    );
  }
};


const mapStateToProps = (state, ownProps) => {
  return {
    tab: state.global.tab
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeUrl: (url) => {
      dispatch(push(url));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);