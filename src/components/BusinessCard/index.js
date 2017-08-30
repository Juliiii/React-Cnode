import React from 'react';
import Avatar from '../Avatar';
import { Card, Flex } from 'antd-mobile';
import { colors } from '.././../constants';  
const BusinessCard = ({info}) => {
  const { avatar_url, loginname, score, create_at } = info;
  return (
    <Card style={{
      padding: '0.3rem'
    }}>
    <Flex
      direction="column"
    >
      <Avatar
        size={200}
        src={avatar_url}
      />
      <span style={styles}>{loginname}</span>
      <span style={styles}>积分: {score}</span>
      <span style={styles}>C龄: {create_at}</span>
    </Flex>
    </Card>
  );
}

const styles = {
  margin: '0.2rem 0',
  color: colors.blue
};

export default BusinessCard;