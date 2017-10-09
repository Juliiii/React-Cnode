import { observable, action } from 'mobx';
import axios from '../axios';

class Topics {
  @observable tab;
  @observable page;
  @observable data;
  @observable loading;
  @observable refreshing;
  @observable reachEnd;
  limit;

  constructor(obj) {
    this.init(obj)
    this.limit = 20;
  }
  // init data
  init ({tab, page, data}) {
    this.tab = tab ? JSON.parse(tab) : 'all';
    this.page = page ? JSON.parse(page) : -1;
    this.data = data ? JSON.parse(data) : [];
    this.loading = false;
    this.refreshing = false;
    this.reachEnd = false;
  }
  // change the types of topics
  @action
  async changeTab (tab) {
    this.init({tab: JSON.stringify(tab)});
    await this.refresh();
  }
  // refresh
  @action
  async refresh () {
    if (this.loading || this.refreshing) return;
    try {
      this.refreshing = true;
      const { data } = await axios.get(`/topics?tab=${this.tab}&page=${this.page+1}&limit=${this.limit}`);
      this.data = data.data;
      this.page++;
      localSave({
        tab: this.tab,
        page: this.page,
        data: this.data
      });
    } finally {
      this.refreshing = false;
    }
  }
  // loadMoreData
  @action
  async loadData () {
    if (this.reachEnd || this.loading || this.refreshing) return;
    try {
      this.loading = true;
      const { data } = await axios.get(`/topics?tab=${this.tab}&page=${this.page+1}&limit=${this.limit}`);
      this.data = [...this.data, ...data.data];
      this.page++;
      this.reachEnd = data.data.length === 0;
      localSave({
        tab: this.tab,
        page: this.page,
        data: this.data
      });
    } finally {
      this.loading = false;
    }
  }
}

function localSave(obj) {
  Object.entries(obj).map(([key, value]) => localStorage.setItem(key, JSON.stringify(value)));
}

export default new Topics();