import { observable, action, useStrict, runInAction } from 'mobx';
import axios from '../axios';
import session from './session';
import status from './status';

useStrict(true);

class Messages {
  @observable messages = [];
  @observable messageCount = 0;
  @observable loading = false;
  allmessages = [];
  page = 1;
  reachEnd = false;
  limit = 10;

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
      runInAction(() => {
        this.allmessages = [...data.data.hasnot_read_messages, ...data.data.has_read_messages];
        this.messages = this.allmessages.slice(0, this.limit);
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
    runInAction(() => {
      this.messageCount = 0;
    });
  }

  @action.bound
  loadMore () {
    if (this.reachEnd || this.loading) return;
    this.loading = true;
    this.messages = this.allmessages.slice(0, ++this.page * this.limit);
    this.reachEnd = this.allmessages.length === this.messages.length;
    setTimeout(action(() => {
      this.loading = false;
    }), 500);
  }
}

export default new Messages();
