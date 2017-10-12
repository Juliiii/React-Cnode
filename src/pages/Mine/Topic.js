import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Wrapper from './StateLess';

@inject(({user, status}) => ({
  data: user.recent_topics,
  loading: status.loading,
  getData: user.getInfo,
  _loading: user.recent_topics_loading,
  loadMore: user.loadMoreTopics
}))
@observer
class Topics extends Component {
  render () {
    return <Wrapper {...this.props} title="最近主题" />
  }
};

export default Topics;
