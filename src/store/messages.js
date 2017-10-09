import { observable, action } from 'mobx';
import axios from '../axios';
import session from './session';

class Messages {
  @observable unreadmessages;
  @observable readmessages;
  @observable messageCount;
  @observable loading;

  constructor () {
    this.unreadmessages = this.readmessages = [];
    this.messageCount = 0;
    this.loading = false;
  }

  @action.bound
  async getMessageCount () {
    if (!session.accesstoken) return;
    const { data } = await axios.get(`/message/count?accesstoken=${session.accesstoken}`);
    this.messageCount = data.data;
  }

  @action.bound
  async getMessages () {
    if (!session.accesstoken || this.loading) return;
    try {
      this.loading = true;
      const { data } = await axios.get(`/messages?accesstoken=${accesstoken}`);
      this.unreadmessages = data.data.hasnot_read_messages;
      this.readmessages = data.data.has_read_messages;
    } finally {
      this.loading = false;
    }
  }

  @action.bound
  async markAll () {
    await axios.post('/message/mark_all', {
      accesstoken: session.accesstoken
    });
  }
}

export default new Messages();
