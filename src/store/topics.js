import { observable, action, useStrict, runInAction } from 'mobx';
import axios from '../axios';
import status from './status';
import db from '../utils/db';

useStrict(true);

class Topics {
  @observable type;
  @observable data;
  @observable firstcome = true;
  reachEnd;
  page;
  limit = 5;

  constructor(obj) {
    this.init(obj)
  }
  // init data
  @action.bound
  init ({type, page, data}) {
    this.type = type ? JSON.parse(type) : 'all';
    this.page = page ? JSON.parse(page) : 0;
    this.data = data ? JSON.parse(data) : [];
    this.reachEnd = false;
  }
  // change the types of topics
  @action.bound
  async changeType (type) {
    this.init({type: JSON.stringify(type), page: 0});
    await this.loadData();
  }
  // refresh
  @action.bound
  async refresh (obj) {
    if (status.loading || status.refreshing) return;
    try {
      status.setRefreshing(true);
      const type = obj && obj.type ? obj.type : this.type;
      const { data } = await axios.get(`/topics?tab=${type}&page=1&limit=${this.limit}`);
      runInAction(() => {
        this.data = data.data;
      });
      db.save(['type', 'page', 'data'], {
        type,
        page: 1,
        data: data.data.slice()
      });
    } finally {
      status.setRefreshing(false);
    }
  }
  // loadMoreData
  @action.bound
  async loadData () {
    if (this.reachEnd || status.loading || status.refreshing) return;
    try {
      status.setLoading(true);
      const { data } = await axios.get(`/topics?tab=${this.type}&page=${this.page+1}&limit=${this.limit}`);
      runInAction(() => {
        this.data = [...this.data, ...data.data];
        this.page++;
        this.reachEnd = data.data.length === 0;
        // db.save(['type', 'page', 'data'], {
        //   type: this.type,
        //   page: this.page,
        //   data: this.data.slice()
        // });
      });
    } finally {
      status.setLoading(false);
    }
  }

  @action.bound
  setFirstCome (val) {
    this.firstcome = val;
  }
}

export default new Topics({});
