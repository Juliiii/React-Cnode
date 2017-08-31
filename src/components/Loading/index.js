import React from 'react'
import { Flex, ActivityIndicator } from 'antd-mobile';

const Loading = (props) => {
  return (
    <Flex justify="center"><ActivityIndicator /></Flex>
  );
}

export default Loading;