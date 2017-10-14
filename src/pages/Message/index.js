import React from 'react';
import { SimpleNavbar } from '../../components/NavBar';
import { inject, observer } from 'mobx-react';
import Loading from '../../components/Loading';
import ListItem from './components/MessageListItem';
import List from '../../components/List';

@inject(({messages, status}) => ({
  messages,
  loading: status.loading
}))
@observer
class Message extends React.Component {

  componentWillMount () {
    this.props.messages.getMessages();
  }

  componentWillUnmount () {
    this.props.messages.markAll();
  }

  render () {
    const { loading, messages } = this.props;
    if (loading) return <Loading />;
    return (
      <div>
        <SimpleNavbar title="消息" />
        <div>
          <List
            data={messages.messages}
            ListItem={ListItem}
            disableRefresh
            loading={messages.loading}
            getData={messages.loadMore}
          />
        </div>
      </div>
    );
  }
}

export default Message;