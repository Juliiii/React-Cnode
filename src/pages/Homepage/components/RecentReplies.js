import React from 'react';
import ListItem from '../../../components/ListItem';
import List from '../../../components/List';
import { observer, inject } from 'mobx-react';

const RencentReplies = (props) => (
  <List
    data={props.data}
    useBodyScroll
    disabledRefresh
    loading={props.loading}
    getData={props.loadMore}
    ListItem={ListItem}
  />
);

export default inject(({user}) => ({
  loading: user.recent_replies_loading,
  loadMore: user.loadMoreReplies,
  data: user.recent_replies
}))(observer(RencentReplies));
