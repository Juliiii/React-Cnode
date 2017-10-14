import React from 'react';
import Avatar from '../../../components/Avatar';
import { Flex, Icon } from 'antd-mobile';
import { formatime } from '../../../utils';
import { observer } from 'mobx-react';

const ListItem = ({item : {author, content, create_at, is_uped, ups, id}, onComment, onUps}) => {
  return (
    <div style={{padding: '.2rem 0'}}>
      <Flex align="center">
        <Avatar size="70" src={author.avatar_url} loginname={author.loginname} />
        <Flex direction="column" align="start" style={{marginLeft: '0.2rem'}}>
          <span>{author.loginname}</span>
          <span style={{
              color: '#888',
              marginTop: '0.1rem',
              marginLeft: '0',
              fontSize: '0.25rem'
            }}
          >{formatime(create_at)}
          </span>
        </Flex>
      </Flex>
      <div dangerouslySetInnerHTML={{__html: content}} style={{padding: '0.25rem 0', fontSize: '.3rem' }} />
      <Flex>
        <Flex align="center">
          {
            is_uped 
            ? <Icon type={require('../../../icons/praise_fill.svg')} /> 
            : <Icon type={require('../../../icons/praise.svg')} />
          }
          <span style={{
              color: '#888',
              fontSize: '0.25rem'
            }}
            onClick={() => onUps(id)}
          >{ups.length}人赞
          </span>
        </Flex>
        <Flex align="center" style={{marginLeft: '0.1rem'}}>
          <Icon type={require('../../../icons/message.svg')} />
          <span style={{
              color: '#888',
              fontSize: '0.25rem'
            }}
            onClick={() => onComment({id, author})}
          >回复
          </span>
        </Flex>
      </Flex>
    </div>
  );
}

export default observer(ListItem);
