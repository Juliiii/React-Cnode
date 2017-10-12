import { observable, action, runInAction, useStrict } from 'mobx';
import { Toast } from 'antd-mobile';
import Reply from './Reply';
import session from './session';
import status from './status';
import axios from '../axios';

useStrict(true);

class Detail {
  @observable detail = {};
  @observable allReplies = [];
  @observable replies = [];
  @observable reachEnd = false;
  @observable loading = false;
  @observable backTopShow = false;
  limit = 10;
  page = -1;

  @action.bound
  init () {
    this.detail = {};
    this.allReplies = this.replies = [];
    this.reachEnd = this.loading = this.backTopShow = false;
    this.page = -1;
  }

  @action.bound
  setBackTopShow (val) {
    this.backTopShow = val;
  }
  
  @action.bound
  updateDetail (key, val) {
    if (key in this.detail) {
      this.detail[key] = val;
    }
  }

  @action.bound
  async getDetail ({id}) {
    if (status.loading) return;
    this.init();
    const url = session.accesstoken ? `/topic/${id}?mdrender=true&accesstoken=${session.accesstoken}`
                                    : `/topic/${id}?mdrender=true`;
    try {
      status.setLoading(true);
      const { data } = await axios.get(url);
      runInAction(() => {
        this.detail = data.data;
      });
      this.setReplies(this.detail.replies);
    } catch (err) {
      Toast.fail('加载详情失败', 1);
    } finally {
      status.setLoading(false);
    }
  }

  @action.bound
  setReplies (allReplies) {
    for (const r of allReplies) {
      this.allReplies.push(new Reply(r));
    }
    this.replies = this.allReplies.slice(++this.page * this.limit, this.limit);
  }
  
  @action.bound
  loadMore () {
    if (this.reachEnd || this.loading) return;
    this.loading = true;
    this.replies = this.allReplies.slice(0, ++this.page * this.limit);
    this.reachEnd = this.replies.length === this.allReplies.length;
    setTimeout(action(() => {
      this.loading = false;
    }), 200);
  }

  @action.bound
  async ups ({reply_id}) {
    try {
      const { data } = await axios.post(`/reply/${reply_id}/ups`, {accesstoken : session.accesstoken});
      runInAction(() => {
        let i;
        for (i = this.replies.length - 1; i >= 0; i-- ) {
          if (this.replies[i].id === reply_id) break;
        }
        this.replies[i].updateVal('is_uped', data.action !== 'down');
        this.replies[i].updateVal('ups',
        data.action === 'down' ? this.replies[i].ups.filter(id => id !== session.id) : [...this.replies[i].ups, session.id]);
      });
    } catch (err) {
      if (err.response && err.response.status === 403) {
        Toast.info(err.response.data.error_msg, 1);
      }
    }
  }

  @action.bound
  async comment ({content, reply_id, topic_id}) {
    if (status.submitting) return;
    const successInfo = reply_id ? '回复成功' : '评论成功';
    const errorInfo = reply_id ? '回复失败' : '评论失败';
    try {
      status.setSubmitting(true);
      let body = {
        accesstoken: session.accesstoken,
        content
      };
      if (reply_id) body.reply_id = reply_id;
      const {data} = await axios.post(`/topic/${topic_id}/replies`, body);
      runInAction(() => {
        this.allReplies.push(new Reply({
          id: data.reply_id,
          author: {
            loginname: session.loginname,
            avatar_url: session.avatar_url
          },
          content,
          ups: [],
          create_at: new Date(),
          reply_id: reply_id ? reply_id : null,
          is_uped: false
        }));
        if (this.replies.slice().length === this.allReplies.slice().length - 1) {
          this.replies = [...this.allReplies];
        }
      });
      Toast.success(successInfo, 1);
    } catch (err) {
      Toast.fail(errorInfo, 1);
    } finally {
      status.setSubmitting(false);
    }
  }
}

export default new Detail();