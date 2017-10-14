import React from 'react';
import { Card, Flex, WhiteSpace } from 'antd-mobile';
import { Link } from 'react-router';
import { observer } from 'mobx-react';
import { formatime } from '../../../utils';

const ListItem = (props) => {
  function content (props) {
    if (props.type === 'reply') {
      return (
        <div>
          <div 
            style={{
              fontSize: '.3rem',
              marginBottom: '.2rem'
              }}
          >
            {props.author.loginname}在
            <Link to={`/detail/${props.topic.id}`} style={{color: '#3a40f5'}}>{props.topic.title}</Link>
            回复了你:
          </div>
          <div
            dangerouslySetInnerHTML={{__html: props.reply.content}}
            style={{color: '#333', borderLeft: '5px solid #3a40f5', paddingLeft: '.1rem'}} 
          />
          <div
            style={{
              color: '#888',
              marginTop: '0.2rem',
              marginLeft: '0',
              fontSize: '0.24rem'
            }}
          >{formatime(props.create_at)}
          </div>
        </div>
      );
    } else if (props.type === 'at') {
      return (
        <div>
          <div>
            <span style={{fontSize: '.3rem'}}>{props.author.loginname}</span>
            {props.author.loginname}在
              <Link to={`/detail/${props.topic.id}`} style={{color: '#3a40f5'}}>{props.topic.title}</Link>
              @了你
          </div>
          <div
            style={{
              color: '#888',
              marginTop: '0.2rem',
              marginLeft: '0',
              fontSize: '0.24rem'
            }}
          >{formatime(props.create_at)}
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      <Card
        style={{
          minHeight: '1rem'
        }}
      >
        <Flex align="center" style={{height: '100%', padding: '.2rem .3rem'}}>{content(props.item)}</Flex>
      </Card>
      <WhiteSpace size="md" />
    </div>
  );
}

export default observer(ListItem);
