import React from 'react'
import { Flex, ActivityIndicator } from 'antd-mobile';

const Loading = (props) => {
  return (
    <Flex justify="center"
          align="center"
          style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}
    >
        <ActivityIndicator text={props.text} />
    </Flex>
  );
}

export default Loading;
