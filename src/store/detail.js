import { observable, action, runInAction, useStrict } from 'mobx';
import { Toast } from 'antd-mobile';
import session from './session';
import status from './status';
import axios from '../axios';

useStrict(true);

class Detail {
  @observable detail = {};

  @action.bound
  async getDetail ({id}) {
    if (status.loading) return;
    const url = session.accesstoken ? `/topic/${id}?mdrender=true&accesstoken=${session.accesstoken}`
                                    : `/topic/${id}?mdrender=true`;
    try {
      status.setLoading(true);
      const { data } = await axios.get(url);
      runInAction(() => {
        this.detail = data.data;
      });
    } catch (err) {
      Toast.fail('加载详情失败', 1);
    } finally {
      status.setLoading(false);
    }
  }

  @action.bound
  async collect ({id}) {
    if (!session.accesstoken || status.submitting) return;
    try {
      status.setSubmitting(true);
      await axios.post('/topic_collect/collect', { accesstoken: session.accesstoken, topic_id: id });
      runInAction(() => {
        this.detail.is_collect = true;
      });
      Toast.success('收藏成功', 1);
    } catch(err) {
      Toast.success('收藏失败', 1);
    } finally {
      status.setSubmitting(false);
    }
  }

  @action.bound
  async decollect ({id}) {
    if (!session.accesstoken || status.submitting) return;
    try {
      status.setSubmitting(true);
      await axios.post('/topic_collect/de_collect', { accesstoken: session.accesstoken, topic_id: id });
      runInAction(() => {
        this.detail.is_collect = false;
      });
      Toast.success('取消成功', 1);
    } catch(err) {
      Toast.success('取消失败', 1);
    } finally {
      status.setSubmitting(false);
    }
  }
}

export default new Detail();