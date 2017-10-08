import { observable, action, computed } from 'mobx';
import axios from '../axios';
import { Toast } from 'antd-mobile';
import routing from './routing';

class Session {
  @observable accesstoken = '';
  @observable loginname = '';
  @observable id = '';
  @observable info = {};
  @observable submitting = false;

  @computed get canSubmit () {
    return this.accesstoken !== '';
  }

  @action.bound
  inputAccesstoken (value) {
    this.accesstoken = value;
  }

  @action 
  async login () {
    try {
      this.submitting = true;
      const { data } = await axios.post('/accesstoken', {accesstoken: this.accesstoken});
      console.log(data);
      Toast.success('登录成功', 1);
      routing.replace('/mine');
    } catch (err) {
      Toast.success('登录失败', 1);
    } finally {
      this.submitting = false;
    }
  }
}

export default new Session();