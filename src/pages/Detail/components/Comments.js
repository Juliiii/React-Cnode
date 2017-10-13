import React from 'react';
import { Flex, Card } from 'antd-mobile';
import List from '../../../components/List';
import ListItem from './CommentListItem';
import { inject, observer } from 'mobx-react';

const Comments = (props) => {
  return (
    <Card style={{padding: '0 0.3rem .2rem', margin: '.1rem 0'}}>
      <Card.Header 
          style={{width: '100%', paddingLeft: '0'}}
          title="评论"
      />
      { props.data.length
      ? <List 
          data={props.data} 
          onComment={props.onComment}
          onUps={props.onUps}
          useBodyScroll
          disabledRefresh
          loading={props.loading}
          getData={props.loadMore}
          onScroll={props.onScroll}
          ListItem={ListItem}
        />
      : <Flex align="center" justify="center" style={{fontSize: '.3rem', color: '#bfbfbf'}}>暂时没有评论</Flex>
      }
    </Card>
  );
}

export default inject(({detail}) => ({
  loadMore: detail.loadMore,
  data: detail.replies,
  ups: detail.ups,
  loading: detail.loading,
}))(observer(Comments));