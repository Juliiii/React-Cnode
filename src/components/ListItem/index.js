import React from 'react';
import { Card, WhiteSpace, Flex, Icon } from 'antd-mobile';
import Badge from '../Badge';
import { colors } from '../../constants';
import { formatime } from '../../utils';

const title = ({author: {loginname}, create_at}) => (
  <Flex direction="column" align="start">
    <Flex.Item style={{
      marginLeft: '16px',
      color: colors.blue
    }}>{loginname}</Flex.Item>
    <Flex.Item style={{
      color: '#888',
      marginTop: '0.1rem',
      fontSize: '0.25rem'
    }}>{formatime(create_at)}</Flex.Item>
  </Flex>
);

const extra = ({good, top}) => (
  <Badge top={top} good={good} />
);

const footer = ({reply_count, visit_count}) => (
  <Flex>
    <Flex align="center">
      <Icon type={require('../../icons/browse.svg')} />
      {visit_count}
    </Flex>
    <Flex align="center" style={{marginLeft: '10px'}}>
      <Icon type={require('../../icons/message.svg')} />
      {reply_count}
    </Flex>
  </Flex>
);


const ListItem = ({item}) => {
  console.log(item);
  return (
    <div>
      <Card
         style={{
           minHeight: '150px'
         }}
         full
      >
        <Card.Header
          title={title(item)}
          thumb={item.author.avatar_url}
          extra={extra(item)}
          thumbStyle={{
            height: '60px'
          }}
        />
        <Card.Body 
          style={{
            padding: '0 0.3rem',
            height: '1rem',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <h4>{item.title}</h4>
        </Card.Body>
        <Card.Footer content={footer(item)} extra={<div>{formatime(item.last_reply_at)}</div>} />
      </Card>
      <WhiteSpace size="xs" />
    </div>
  );
};

export default ListItem;
