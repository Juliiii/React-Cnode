import { observable, action, runInAction, useStrict } from 'mobx';
import session from './session';
import status from './status';
import detail from './detail';
import { Toast } from 'antd-mobile';
import axios from '../axios';

useStrict(true);

class Collections {
  @observable collections = [];

  @action.bound
  async getCollections () {
    try {
      status.setLoading(true);
      const { data } = await axios.get(`/topic_collect/${session.loginname}`);
      runInAction(() => {
        this.collections = data.data;
      });
    } finally {
      status.setLoading(false);
    }
  }

  @action.bound
  async collect () {
    if (!session.accesstoken || status.submitting) return;
    try {
      status.setSubmitting(true);
      await axios.post('/topic_collect/collect', { accesstoken: session.accesstoken, topic_id: detail.detail.id });
      detail.updateDetail('is_collect', true);
      Toast.success('收藏成功', 1);
    } catch(err) {
      Toast.success('收藏失败', 1);
    } finally {
      status.setSubmitting(false);
    }
  }

  @action.bound
  async decollect () {
    if (!session.accesstoken || status.submitting) return;
    try {
      status.setSubmitting(true);
      await axios.post('/topic_collect/de_collect', { accesstoken: session.accesstoken, topic_id: detail.detail.id });
      detail.updateDetail('is_collect', false);
      Toast.success('取消成功', 1);
    } catch(err) {
      Toast.success('取消失败', 1);
    } finally {
      status.setSubmitting(false);
    }
  }
}

export default new Collections();