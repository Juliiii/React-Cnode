import { observable, action, useStrict, computed } from 'mobx';
import marked from 'marked';
import status from './status';
import session from './session';
import routing from './routing';
import axios from '../axios';
import { Toast } from 'antd-mobile';

useStrict(true);

const rules = {
  content (val) {
    return !val;
  },
  tab (val) {
    return false;
  },
  title (val) {
    return !val || val.length < 10
  }
}


marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

class Publish {
  @observable content = '';
  @observable title = ''
  @observable tab = ['ask']
  @observable error = {
    title: null,
    tab: false,
    content: null
  }

  @computed get markdown () {
    return marked(this.content);
  }

  @computed get canSubmit () {
    for (const val of Object.values(this.error)) {
      if (val === null || val) {
        return false;
      }
    }
    return true;
  }

  @action.bound
  handleChange (key, val) {
    this[key] = val;
    this.error[key] = rules[key](this[key]);
  }

  @action.bound
  async publish () {
    try {
      status.setSubmitting(true);
      const payload = {
        content: this.content,
        title: this.title,
        tab: this.tab[0],
        accesstoken: session.accesstoken
      };
      await axios.post('/topics', payload);
      routing.push('/success');
    } catch (err) {
      Toast.fail('发布失败，稍后再试', 1);
    } finally {
      status.setSubmitting(false);
    }
  }


  @action.bound
  clear () {
    this.content = '';
    this.title = '';
    this.tab = [];
    this.error = {
      title: false,
      tab: false,
      content: false
    };
  }
}

export default new Publish();