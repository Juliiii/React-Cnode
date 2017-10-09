import { observable, action } from 'mobx';
import { Toast } from 'antd-mobile';
import session from './session';
import axios from '../axios';

class Detail {
  @observable detail;
  @observable loading;
  @observable submitting;


  constructor() {
    this.detail = {};
    this.loading = false;
    this.submitting = false;
  }

  @action.bound
  async getDetail ({id}) {
    if (this.loading) return;
    const url = session.accesstoken ? `/topic/${id}?mdrender=true&accesstoken=${session.accesstoken}`
                                    : `/topic/${id}?mdrender=true`;
    try {
      this.loading = true;
      const { data } = await axios.get(url);
      this.detail = data.data;
    } catch (err) {
      Toast.fail('加载详情失败', 1);
    } finally {
      this.loading = false;
    }
  }

  @action.bound
  async collect ({id}) {
    if (!session.accesstoken || this.submitting) return;
    try {
      this.submitting = true;
      await axios.post('/topic_collect/collect', { accesstoken: session.accesstoken, topic_id: id });
      this.detail.is_collect = true;
      Toast.success('收藏成功', 1);
    } catch(err) {
      Toast.success('收藏失败', 1);
    } finally {
      this.submitting = false;
    }
  }

  @action.bound
  async decollect ({id}) {
    if (!session.accesstoken || this.submitting) return;
    try {
      this.submitting = true;
      await axios.post('/topic_collect/de_collect', { accesstoken: session.accesstoken, topic_id: id });
      this.detail.is_collect = false;
      Toast.success('取消成功', 1);
    } catch(err) {
      Toast.success('取消失败', 1);
    } finally {
      this.submitting = false;
    }
  }
}

export default new Detail();