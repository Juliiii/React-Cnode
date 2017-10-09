import { observable, action } from 'mobx';
import { Toast } from 'antd-mobile';
import session from './session';

class Comments {
  allReplies;
  limit;
  page;
  @observable replies;
  @observable loading;
  @observable reachEnd;
  @observable submitting;
  constructor () {
    this.allReplies = [];
    this.replies = [];
    this.limit = 10;
    this.page = -1;
    this.loading = this.reachEnd = this.submitting = false;
  }

  @action.bound
  setReplies (allReplies) {
    this.allReplies = allReplies;
    this.replies = allReplies.slice(++this.page * limit, limit);
  }

  @action.bound
  loadMore () {
    if (this.reachEnd || this.loading) return;
    this.replies = this.allReplies.slice(++this.page * limit, limit);
    this.reachEnd = this.replies.length === this.allReplies.length;
    setTimeout(() => {
      this.loading = false;
    }, 200);
  }

  @action.bound
  async ups ({reply_id}) {
    try {
      const { data } = await axios.post(`/reply/${reply_id}/ups`, {accesstoken : session.accesstoken});
      this.replies.forEach(reply => {
        if (reply.id === reply_id) {
          reply.ups = data.data.action === 'down' ? reply.ups.filter(id => id !== session.id) : [...reply.ups, session.id];
          reply.is_uped = data.data.action !== 'down';
        }
      });
    } catch (err) {
      if (err.response && err.response.status === 403) {
        Toast.info(err.response.data.error_msg, 1);
      }
    }
  }

  @action.bound
  async comment ({content, reply_id, topic_id}) {
    if (this.submitting) return;
    const successInfo = reply_id ? '回复成功' : '评论成功';
    const errorInfo = reply_id ? '回复失败' : '评论失败';
    try {
      this.submitting = true;
      let body = {
        accesstoken: session.accesstoken,
        content
      };
      if (reply_id) body.reply_id = reply_id;
      const {data} = await axios.post(`/topic/${topic_id}/replies`, body);
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
      Toast.success(successInfo, 1);
    } catch (err) {
      Toast.fail(errorInfo, 1);
    } finally {
      this.submitting = false;
    }
  }

}

export default new Comments();