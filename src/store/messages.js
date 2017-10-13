import { observable, action, useStrict, runInAction } from 'mobx';
import axios from '../axios';
import session from './session';
import status from './status';

useStrict(true);

class Messages {
  @observable unreadmessages = [];
  @observable readmessages = [];
  @observable messageCount = 0;

  @action.bound
  async getMessageCount () {
    if (!session.accesstoken) return;
    const { data } = await axios.get(`/message/count?accesstoken=${session.accesstoken}`);
    runInAction(() => {
      this.messageCount = data.data;
    });
  }

  @action.bound
  async getMessages () {
    if (!session.accesstoken || status.loading) return;
    try {
      status.setLoading(true);
      const { data } = await axios.get(`/messages?accesstoken=${session.accesstoken}`);
      console.log(data);
      runInAction(() => {
        this.unreadmessages = data.data.hasnot_read_messages;
        this.readmessages = data.data.has_read_messages;
      });
    } finally {
      status.setLoading(false);
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
