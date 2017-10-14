import React from 'react';
import { Flex, Icon } from 'antd-mobile';
import { observer, inject } from 'mobx-react';
import { formatime } from '../../../utils';

const Title = (props) => {
  return (
    <Flex direction="column" align="start" style={{width: '100%'}}>
      <span>{props.title}</span>
      <Flex justify="between" style={{width: '100%', paddingTop: '0.2rem'}}>
        <Flex style={{ fontSize: '0.28rem', color: '#888'}}>
          <span>发布于{formatime(props.create_at)}</span>
          <Flex align="center" style={{marginLeft: '.1rem'}}>
            <Icon type={require('../../../icons/browse.svg')} />
            {props.visit_count}
          </Flex>
          <Flex align="center" style={{marginLeft: '.1rem'}}>
            <Icon type={require('../../../icons/message.svg')} />
            {props.reply_count}
          </Flex>
        </Flex>
        { !props.accesstoken ? null :
          <div>
            {!props.is_collect && <Icon type={require('../../../icons/collection.svg')} onClick={() => props.collect()} />}
            {props.is_collect && <Icon type={require('../../../icons/collection_fill.svg')} onClick={() => props.decollect()} />}
          </div>
        }
      </Flex>
    </Flex>
  );
}

export default inject(({detail, session, collections}) => ({
  ...detail.detail,
  collect: collections.collect,
  decollect: collections.decollect,
  accesstoken: session.accesstoken
}))(observer(Title));