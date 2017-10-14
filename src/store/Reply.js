import { observable, action, useStrict } from 'mobx';

useStrict(true);

class Reply {
  @observable id;
  @observable author;
  @observable content;
  @observable ups;
  @observable create_at;
  @observable reply_id;
  @observable is_uped;

  constructor (obj) {
    for (const key in obj) {
      this[key] = obj[key];
    }
  }

  @action.bound
  updateVal (key, val) {
    this[key] = val;
  }
}

export default Reply;