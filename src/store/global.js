import { observable, action, useStrict } from 'mobx';
import routing from './routing';
import db from '../utils/db';
useStrict(true);

class Global {
  @observable tab = 'home'
  @observable from = '/'
  @observable to = '/'

  constructor ({from, to, tab}) {
    this.from = from ? JSON.parse(from) : '/';
    this.to = to ? JSON.parse(to) : '/';
    this.tab = tab ? JSON.parse(tab) : 'home';
  }

  @action.bound
  updateRouteTable (newPath) {
    this.from = this.to;
    this.to = newPath;
    db.save(['from', 'to'], { to: this.to, from: this.from });
  }

  @action.bound
  changeTab (tab) {
    this.tab = tab;
    db.save(['tab'], { tab });
    switch (tab) {
      case 'publish': routing.push('/publish'); break;
      case 'mine': routing.push('/mine'); break;
      default: routing.push('/');
    }
  }
}

const self = new Global(db.get(['tab', 'from', 'to']));

export default self;