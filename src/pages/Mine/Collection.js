import React, { Component } from 'react';
import Wrapper from './StateLess';
import { inject, observer } from 'mobx-react';

@inject(({collections, status}) => ({
  data: collections.collections,
  getData: collections.getCollections,
  loading: status.loading,
  _loading: collections.loading,
  loadMore: collections.loadMore
}))
@observer
class Collections extends Component {
  render () {
    return <Wrapper {...this.props} title="我的收藏" />
  }
};

export default Collections;
