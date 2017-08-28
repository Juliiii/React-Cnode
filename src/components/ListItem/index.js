import React from 'react';
import { browserHistory } from 'react-router';
import { Card, WhiteSpace, Flex, Icon } from 'antd-mobile';
import Badge from '../Badge';
import styles from './index';
import { colors } from '../../constants';
const title = () => (
  <Flex direction="column" align="start">
    <Flex.Item style={{
      marginLeft: '16px',
      color: colors.blue
    }}>ZLF</Flex.Item>
    <Flex.Item style={{
      color: '#888',
      fontSize: '26px'
    }}>刚刚</Flex.Item>
  </Flex>
);

const extra = () => (
  <Badge top={true} good={true} />
);

const footer = () => (
  <Flex>
    <Flex align="center">
      <Icon type={require('../../icons/browse.svg')} />123
    </Flex>
    <Flex align="center" style={{marginLeft: '10px'}}>
      <Icon type={require('../../icons/message.svg')} />
      123
    </Flex>
  </Flex>
);


const ListItem = () => {
  return (
    <div onClick={() => browserHistory.push('/test')}>
      <WhiteSpace size="xs" />
      <Card className={styles.card} full>
        <Card.Header
          title={title()}
          thumb="https://avatars3.githubusercontent.com/u/23744602?v=4&s=120"
          extra={extra()}
          thumbStyle={{
            height: '80px'
          }}
        />
        <Card.Body 
          style={{
            padding: '0.12rem 0.3rem'
          }}
        >
          <h4>杭州 Nodeh2arty 第四期总结（slide、现场照片）</h4>
        </Card.Body>
        <Card.Footer content={footer()} extra={<div>createdTime</div>} />
      </Card>
      <WhiteSpace size="xs" />
    </div>
  );
};

export default ListItem;