import React from 'react';
import { Card } from 'antd-mobile';
import { observer, inject } from 'mobx-react';

const Owner = ({author}) => {
  const avatar_url = author ? author.avatar_url : '';
  const loginname = author ? author.loginname : '';

  return (
  <Card style={{minHeight: 'auto', marginTop: '.1rem'}}>
    <Card.Header
      thumb={avatar_url}
      title={loginname}
      extra={<span style={{fontSize: '.3rem'}}>楼主</span>}
      thumbStyle={{height: '.6rem', width: '.6rem'}}
    />
  </Card>
)};

export default inject(({detail}) => ({
  author: detail.detail.author
}))(observer(Owner));
