import { observable, action, useStrict, runInAction } from 'mobx';
import session from './session';
import status from './status';
import axios from '../axios';
import global from './global';

useStrict(true);

class User {
  @observable info = {};
  @observable recent_replies = [];
  @observable recent_topics = [];
  @observable recent_replies_loading = false;
  @observable recent_topics_loading = false;
  @observable recent_replies_reachEnd = false;
  @observable recent_topics_reachEnd = false;
  limit = 10;
  recent_replies_page = 0;
  recent_topics_page = 0;


  @action.bound
  async getInfo ({loginname}) {
    if (status.loading) return;
    if (!loginname) loginname = session.loginname;
    try {
      status.setLoading(true);
      const { data } = await axios.get(`/user/${loginname}`);
      runInAction(() => {
        this.info = data.data;
        this.recent_replies = data.data.recent_replies.slice(0, this.limit);
        this.recent_topics = data.data.recent_topics.slice(0, this.limit);
        this.recent_replies_page = this.recent_topics_page = 0;
        this.recent_replies_reachEnd = this.recent_topics_reachEnd = this.recent_replies_loading = this.recent_topics_loading = false;
      });
      global.updateVal('changed', true);
    } finally {
      status.setLoading(false);
    }
  }

  @action.bound
  loadMore (prefix) {
    if (this[`${prefix}_reachEnd`] || this[`${prefix}_loading`]) return;
    this[`${prefix}_loading`] = true;
    this[prefix] = this.info[prefix].slice(0, ++this[`${prefix}_page`] * this.limit);
    this[`${prefix}_reachEnd`] = this[prefix].length === this.info[prefix].length;
    setTimeout(action(() => {
      this[`${prefix}_loading`] = false;
    }), 500);
  }

  @action.bound
  loadMoreTopics () {
    this.loadMore('recent_topics');
  }

  @action.bound
  loadMoreReplies () {
    this.loadMore('recent_replies');
  }
}

export default new User();
