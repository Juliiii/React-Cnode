import { observable, action, useStrict } from 'mobx';
import routing from './routing';
import db from '../utils/db';
import {RouteTabMap} from '../router/index'

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

  //tab切换 + 路由切换
  @action.bound
  changeTab (tab) {
    this.tab = tab;
    db.save(['tab'], { tab });
    this.LinkTo();
  }

  LinkTo () {
    for(let key in RouteTabMap) {
      let value = RouteTabMap[key]
      if(value === this.tab) {
        routing.push(key)
        break
      }
    }
  }
}

const self = new Global(db.get(['tab', 'from', 'to']));

export default self;
