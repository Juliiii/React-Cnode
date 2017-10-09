import { observable, action } from 'mobx';

class Comments {
  replies;
  @
  constructor(){
    this.replies = [];
  }

  @action
  setReplies (replies) {
    this.replies = replies;
  }


}

export default new Comments();