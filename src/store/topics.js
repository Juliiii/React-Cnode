import { observable, action, useStrict, runInAction } from 'mobx';
import axios from '../axios';
import status from './status';

useStrict(true);

class Topics {
  @observable tab;
  @observable page;
  @observable data;
  @observable reachEnd;
  limit = 20;

  constructor(obj) {
    this.init(obj)
  }
  // init data
  @action.bound
  init ({tab, page, data}) {
    this.tab = tab ? JSON.parse(tab) : 'all';
    this.page = page ? JSON.parse(page) : -1;
    this.data = data ? JSON.parse(data) : [];
    this.reachEnd = false;
  }
  // change the types of topics
  @action.bound
  async changeTab (tab) {
    await this.refresh({tab});
  }
  // refresh
  @action.bound
  async refresh (obj) {
    if (status.loading || status.refreshing) return;
    try {
      status.setRefreshing(true);
      const tab = obj && obj.tab ? obj.tab : this.tab;
      const { data } = await axios.get(`/topics?tab=${tab}&page=0&limit=${this.limit}`);
      this.init({tab, page: 0, data: data.data});
      localSave({
        tab,
        page: 0,
        data: data.data
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
      const { data } = await axios.get(`/topics?tab=${this.tab}&page=${this.page+1}&limit=${this.limit}`);
      runInAction(() => {
        this.data = [...this.data, ...data.data];
        this.page++;
        this.reachEnd = data.data.length === 0;
        localSave({
          tab: this.tab,
          page: this.page,
          data: this.data
        });
      });
    } finally {
      status.setLoading(false);
    }
  }
}

function localSave(obj) {
  Object.entries(obj).map(([key, value]) => localStorage.setItem(key, JSON.stringify(value)));
}

export default new Topics();