import { observable, action, runInAction, useStrict } from 'mobx';
import session from './session';
import status from './status';
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
}

export default new Collections();