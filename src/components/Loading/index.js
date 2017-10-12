import React from 'react'
import { Flex, ActivityIndicator } from 'antd-mobile';

const Loading = (props) => {
  return (
    <Flex justify="center" style={{margin: "30px 0"}}><ActivityIndicator text={props.text} /></Flex>
  );
}

export default Loading;