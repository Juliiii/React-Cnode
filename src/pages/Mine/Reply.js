import React, { Component } from 'react';
import Wrapper from './StateLess';
import { observer, inject } from 'mobx-react';

@inject(({user, status}) => ({
  loading: status.loading,
  data: user.recent_replies,
  getData: user.getInfo,
  _loading: user.recent_replies_loading,
  loadMore: user.loadMoreReplies
}))
@observer
class Replys extends Component {
  render () {
    return <Wrapper {...this.props} title="最近回复" />
  }
};

export default Replys;
