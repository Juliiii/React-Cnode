import React from 'react';
import { Icon, TabBar } from 'antd-mobile';
import { colors } from '../../constants';
import { inject, observer } from 'mobx-react';


@inject(({global, messages}) => ({
  tab: global.tab,
  changeTab: global.changeTab,
  getMessageCount: messages.getMessageCount,
  messageCount: messages.messageCount,
  getMessages: messages.getMessages
}))
@observer
class Main extends React.Component {
  componentWillMount () {
    this.props.getMessageCount();
  }

  render () {
    const { changeTab, tab, children, messageCount } = this.props;
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
            key="主页"
            selected={tab === 'home'}
            onPress={() => {
              changeTab('home');
            }}
          />
          <TabBar.Item
            icon={<Icon type={require('../../icons/brush.svg')} size="md" />}
            selectedIcon={<Icon type={require('../../icons/brush_fill.svg')} size="md" />}
            key="发帖"
            selected={tab === 'publish'}
            onPress={() => {
              changeTab('publish');
            }}
          />
          <TabBar.Item
            icon={<Icon type={require('../../icons/remind.svg')} size="md" />}
            selectedIcon={<Icon type={require('../../icons/remind_fill.svg')} size="md" />}
            key="消息"
            badge={messageCount}
            selected={tab === 'message'}
            onPress={() => {
              changeTab('message');
            }}
          />
          <TabBar.Item
            icon={<Icon type={require('../../icons/people.svg')} size="md" />}
            selectedIcon={<Icon type={require('../../icons/people_fill.svg')} size="md" />}
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
