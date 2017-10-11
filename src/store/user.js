import { observable, action, useStrict, runInAction } from 'mobx';
import session from './session';
import status from './status';
import axios from '../axios';

useStrict(true);

class User {
  @observable info = {};

  @action.bound
  async getInfo ({loginname}) {
    if (status.loading) return;
    if (!loginname) loginname = session.loginname;
    try {
      status.setLoading(true);
      const { data } = await axios.get(`/user/${loginname}`);
      runInAction(() => {
        this.info = data.data;
      });
    } finally {
      status.setLoading(false);
    }
  }
}

export default new User();
