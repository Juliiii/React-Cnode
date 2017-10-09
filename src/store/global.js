import { observable, action } from 'mobx';
import routing from './routing';

class Global {
  @observable tab = 'home'
  @observable from = '/'
  @observable to = '/'

  constructor ({from, to}) {
    this.from = from;
    this.to = to;
  }

  @action.bound
  updateRouteTable (newPath) {
    this.from = this.to;
    this.to = newPath;
    localStorage.setItem('from', this.from);
    localStorage.setItem('to', this.to);
  }

  @action.bound
  changeTab (tab) {
    this.tab = tab;
    switch (tab) {
      case 'home': routing.push('/'); break;
      case 'publish': routing.push('/publish'); break;
      case 'mine': routing.push('/mine'); break;
      default: routing.push('/'); break;
    }
  }
}

const tab = localStorage.getItem('tab');
const from = localStorage.getItem('from');
const to = localStorage.getItem('to');

const self = new Global({from, to});
self.changeTab(tab);

export default self;