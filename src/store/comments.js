import { observable, action, runInAction, useStrict } from 'mobx';
import { Toast } from 'antd-mobile';
import session from './session';
import status from './status';

useStrict(true);

class Comments {
  allReplies = [];
  limit = 10;
  page = -1;
  @observable replies = [];
  @observable reachEnd = false;

  @action.bound
  setReplies (allReplies) {
    this.allReplies = allReplies;
    this.replies = allReplies.slice(++this.page * limit, limit);
  }

  @action.bound
  loadMore () {
    if (this.reachEnd || status.loading) return;
    this.replies = this.allReplies.slice(++this.page * limit, limit);
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
        this.replies.forEach(reply => {
          if (reply.id === reply_id) {
            reply.ups = data.data.action === 'down' ? reply.ups.filter(id => id !== session.id) : [...reply.ups, session.id];
            reply.is_uped = data.data.action !== 'down';
          }
        });
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
        this.allReplies.push({
          id: data.data.reply_id,
          author: {
            loginname: session.loginname,
            avatar_url: session.avatar_url
          },
          content,
          ups: [],
          create_at: new Data(),
          reply_id: reply_id ? reply_id : null,
          is_uped: false
        });
      });
      Toast.success(successInfo, 1);
    } catch (err) {
      Toast.fail(errorInfo, 1);
    } finally {
      status.setSubmitting(false);
    }
  }

}

export default new Comments();