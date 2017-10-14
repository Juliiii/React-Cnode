import React from 'react';
import { Card } from 'antd-mobile';
import { observer, inject } from 'mobx-react';
import Title from './Title';

const Content = ({content}) => {
  return (
    <Card style={{padding: '0 0.2rem .2rem', marginTop: '.1rem'}}>
      <Card.Header 
        title={<Title />}
        style={{borderBottom: '1px solid #bfbfbf', marginBottom: '.2rem'}} 
      />
      <div dangerouslySetInnerHTML={{
        __html: content
      }}
      />
    </Card>
  );
}

export default inject(({detail}) => ({
  content: detail.detail.content
}))(observer(Content));
