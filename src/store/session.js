import { observable, action, computed, useStrict, runInAction } from 'mobx';
import axios from '../axios';
import { Toast } from 'antd-mobile';
import status from './status';
import global from './global';
import db from '../utils/db';

useStrict(true);

const keys = ['accesstoken', 'id', 'loginname'];

class Session {
  @observable accesstoken;
  @observable loginname;
  @observable id;

  constructor (obj) {
    this.init(obj);
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
        Object.entries(data).forEach(([key, value]) => {
          if (key !== 'success') {
            this[key] = value;
          }
        });
      });
      db.save(keys, this);
      Toast.success('登录成功', 1);
      global.changeTab(global.tab);
    } catch (err) {
      Toast.fail('登录失败', 1);
    } finally {
      console.log(status);
      status.setSubmitting(false);  
    }
  }

  @action.bound
  clear () {
    this.init({});
  }

  @action.bound
  logout () {
    this.clear();
    db.remove(keys);
  }
}




export default new Session(db.get(keys));