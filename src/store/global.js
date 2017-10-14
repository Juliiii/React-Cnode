import { observable, action, useStrict } from 'mobx';
import routing from './routing';
import db from '../utils/db';
useStrict(true);

const LinkToWhiteList = ['/', '/message', '/publish', '/mine'];

class Global {
  @observable tab = 'home';
  @observable to = '/';
  @observable from = '/';
  @observable changed = false;

  constructor ({from, to, tab}) {
    this.from = from ? JSON.parse(from) : '/';
    this.to = to ? JSON.parse(to) : '/';
    this.tab = tab ? JSON.parse(tab) : 'home';
    if (LinkToWhiteList.some(pathname => pathname === routing.location.pathname)) {
      this.LinkTo();
    }
  }

  @action.bound
  updateRouteTable (newPath) {
    this.from = this.to;
    this.to = newPath;
    db.save(['from', 'to'], { to: this.to, from: this.from });
    this.changed = false;
  }

  @action.bound
  updateVal (key, val) {
    this[key] = val;
  }

  @action.bound
  changeTab (tab) {
    this.tab = tab;
    db.save(['tab'], { tab });
    this.LinkTo();
  }

  LinkTo () {
    switch (this.tab) {
      case 'home': routing.push('/'); break;
      case 'publish': routing.push('/publish'); break;
      case 'message': routing.push('/message'); break;
      case 'mine': routing.push('/mine'); break;
      default: return;
    }
  }
}

const self = new Global(db.get(['tab', 'from', 'to']));

export default self;