import React from 'react';
import { Card, WhiteSpace, Flex, Icon } from 'antd-mobile';
import Badge from '../Badge';
import Avatar from '../Avatar';
import { colors } from '../../constants';
import { formatime } from '../../utils';
import { Link } from 'react-router';

const title = ({author: {loginname}, create_at}) => (
  <Flex direction="column" align="start" style={{padding: '0 .1rem'}}>
    <Flex.Item style={{
      color: colors.blue,
      fontSize: '0.28rem'
    }}
    >{loginname}
    </Flex.Item>
    <Flex.Item style={{
      color: '#888',
      marginTop: '0.1rem',
      marginLeft: '0',
      fontSize: '0.24rem'
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
      {visit_count !== undefined ? <Icon type={require('../../icons/browse.svg')} /> : null}
      {visit_count}
    </Flex>
    <Flex align="center" style={{marginLeft: '10px'}}>
      {reply_count !== undefined ? <Icon type={require('../../icons/message.svg')} /> : null}
      {reply_count}
    </Flex>
  </Flex>
);

const footerExtra = ({last_reply_at}) => (
  <Flex align="center" justify="end" style={{height: '100%', fontSize: '0.24rem'}}>最新动态: {formatime(last_reply_at)}</Flex>
);



const ListItem = ({item, index, length}) => {
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
            thumb={<Avatar src={item.author.avatar_url} loginname={item.author.loginname} isCircle={false} size={60} />}
            extra={extra(item)}
          />
          <Card.Body 
            style={{
              padding: '0.1rem 0.3rem',
              height: '1rem',
              wordWrap: 'break-word',
              wordBreak: 'break-all'
            }}
          >
            <Flex align="center"><h4>{item.title}</h4></Flex>
          </Card.Body>
          <Card.Footer content={footer(item)} extra={footerExtra(item)} />
        </Card>
      </Link>
      {Number(index) === length - 1 ? null : <WhiteSpace size="md" />}
    </div>
  );
};

export default ListItem;
