import React from 'react';
import { Icon, TabBar } from 'antd-mobile';
import { colors } from '../../constants';
import { inject, observer } from 'mobx-react';


@inject(({global}) => ({
  tab: global.tab,
  changeTab: global.changeTab
}))
@observer
class Main extends React.Component {
  render () {
    const { changeTab, tab, children } = this.props;
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
              changeTab('home');
            }}
          />
          <TabBar.Item
            icon={<Icon type={require('../../icons/brush.svg')} size="md" />}
            selectedIcon={<Icon type={require('../../icons/brush_fill.svg')} size="md" />}
            title="发帖"
            key="发帖"
            selected={tab === 'publish'}
            onPress={() => {
              changeTab('publish');
            }}
          />
          <TabBar.Item
            icon={<Icon type={require('../../icons/people.svg')} size="md" />}
            selectedIcon={<Icon type={require('../../icons/people_fill.svg')} size="md" />}
            title="我的"
            key="我的"
            selected={tab === 'mine'}
            onPress={() => {
              changeTab('mine');
            }}
          />
        </TabBar>
        {children}
      </div>
    );
  }
};

export default Main;
