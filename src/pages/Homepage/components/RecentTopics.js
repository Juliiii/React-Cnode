import React from 'react';
import ListItem from '../../../components/ListItem';
import List from '../../../components/List';
import { observer, inject } from 'mobx-react';

const RencentTopics = (props) => (
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
  loading: user.recent_topics_loading,
  loadMore: user.loadMoreTopics,
  data: user.recent_topics
}))(observer(RencentTopics));
