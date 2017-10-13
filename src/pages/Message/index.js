import React from 'react';
import { SimpleNavbar } from '../../components/NavBar';

class Message extends React.Component {
  componentWillMount () {

  }

  render () {
    return (
      <div>
        <SimpleNavbar title="消息" />
      </div>
    );
  }
}

export default Message;