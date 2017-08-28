import React from 'react';
import Avatar from '../Avatar';
import { Card, Flex } from 'antd-mobile';
import { colors } from '.././../constants';  
const BusinessCard = (props) => {
  return (
    <Card style={{
      padding: '0.3rem'
    }}>
    <Flex
      direction="column"
    >
      <Avatar
        size={200}
      />
      <span style={styles}>ZHULIFENG</span>
      <span style={styles}>积分: 123</span>
      <span style={styles}>C龄: 1个月</span>
    </Flex>
    </Card>
  );
}

const styles = {
  margin: '0.2rem 0',
  color: colors.blue
};

export default BusinessCard;