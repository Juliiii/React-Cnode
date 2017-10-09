import { obversable, action } from 'mobx';
import session from './session';
import axios from '../axios';

class User {
  @obversable info;
  @obversable loading;

  constructor () {
    this.info = {};
    this.loading = false;
  }

  @action.bound
  async getInfo ({loginname}) {
    if (this.loading) return;
    if (!loginname) loginname = session.loginname;
    try {
      this.loading = true;
      const { data } = await axios.get(`/user/${loginname}`);
      this.info = data.data;
    } finally {
      this.loading = false;
    }
  }
}

export default new User();
