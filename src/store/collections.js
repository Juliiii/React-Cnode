import { observable, action } from 'mobx';
import session from './session';
import axios from '../axios';

class Collections {
  @observable collections;
  @observable loading;

  constructor () {
    this.collections = [];
  }

  @action.bound
  async getCollections () {
    try {
      this.loading = true;
      const { data } = await axios.get(`/topic_collect/${session.loginname}`);
      this.collections = data.data;
    } finally {
      this.loading = false;
    }
  }
}

export default new Collections();