import { observable, action, computed, useStrict, runInAction } from 'mobx';
import axios from '../axios';
import { Toast } from 'antd-mobile';
import routing from './routing';
import status from './status';

useStrict(true);

class Session {
  @observable accesstoken;
  @observable loginname;
  @observable avatar_url;
  @observable id;

  constructor () {
    this.init();
  }

  @action.bound
  init () {
    this.accesstoken = '';
    this.loginname = '';
    this.id = '';
    this.avatar_url = '';
  }

  @computed get canSubmit () {
    return this.accesstoken !== '';
  }

  @action.bound
  inputAccesstoken (value) {
    this.accesstoken = value;
  }

  @action.bound 
  async login () {
    try {
      status.setSubmitting(true);
      const { data } = await axios.post('/accesstoken', {accesstoken: this.accesstoken});
      runInAction(() => {
        Object.entries(data.data).forEach(([key, value]) => {
          if (key !== 'success') {
            this[key] = value;
          }
        });
      });
      Toast.success('登录成功', 1);
      routing.replace('/mine');
    } catch (err) {
      Toast.success('登录失败', 1);
    } finally {
      status.setSubmitting(false);
    }
  }

  @action.bound
  clear () {
    this.init();
  }
}

export default new Session();