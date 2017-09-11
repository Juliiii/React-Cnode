import React from 'react';
import { Card, WhiteSpace, Flex, Icon } from 'antd-mobile';
import Badge from '../Badge';
import { colors } from '../../constants';
import { formatime } from '../../utils';
import { Link } from 'react-router';

const title = ({author: {loginname}, create_at}) => (
  <Flex direction="column" align="start" style={{padding: '0 .1rem'}}>
    <Flex.Item style={{
      color: colors.blue
    }}
    >{loginname}
    </Flex.Item>
    <Flex.Item style={{
      color: '#888',
      marginTop: '0.1rem',
      marginLeft: '0',
      fontSize: '0.25rem'
    }}
    >{create_at ? formatime(create_at) : null}
    </Flex.Item>
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

const footerExtra = ({last_reply_at}) => (
  <Flex align="center" justify="end" style={{height: '100%'}}>最新动态: {formatime(last_reply_at)}</Flex>
);



const ListItem = ({item}) => {
  return (
    <div>
      <Link to={`/detail/${item.id}`}>
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
              height: '.6rem',
              width: '.6rem'
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
          <Card.Footer content={footer(item)} extra={footerExtra(item)} />
        </Card>
      </Link>
      <WhiteSpace size="xs" />
    </div>
  );
};

export default ListItem;
