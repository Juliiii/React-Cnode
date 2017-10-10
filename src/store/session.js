import { observable, action, computed, useStrict, runInAction } from 'mobx';
import axios from '../axios';
import { Toast } from 'antd-mobile';
import routing from './routing';
import status from './status';

useStrict(true);

class Session {
  @observable accesstoken;
  @observable loginname;
  @observable id;

  constructor () {
    this.init(get());
  }

  @action.bound
  init ({accesstoken, loginname, id}) {
    this.accesstoken = accesstoken ? JSON.parse(accesstoken) : '';
    this.loginname = loginname ? JSON.parse(loginname) : '';
    this.id = id ? JSON.stringify(id) : '';
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
      save(data.data);
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

  @action.bound
  logout () {
    this.clear();
    remove();
  }
}

const keys = ['accesstoken', 'id', 'loginname'];

function remove () {
  for (const key of keys) {
    localStorage.removeItem(key);
  }
}

function save (obj) {
  for (const key of keys) {
    localStorage.setItem(key, JSON.stringify(obj[key]));
  }
}

function get () {
  let obj = {};
  for (const key of keys) {
    obj[key] = localStorage.getItem(key);
  }
  return obj;
}

export default new Session();