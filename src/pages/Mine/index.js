import React from 'react'
import BusinessCard from '../../components/BusinessCard';
import { List, Icon, Badge } from 'antd-mobile';
export const Component = (props) => {
  return (
    <div>
      <BusinessCard />
      <List style={{marginTop: '1rem'}}>
        <List.Item 
          thumb={<Icon type={require('../../icons/document_fill.svg')} size="md" />} 
          arrow="horizontal"
        >最近话题</List.Item>
        <List.Item 
          thumb={<Icon type={require('../../icons/interactive_fill.svg')} size="md" />} 
          arrow="horizontal"
        >最近回复</List.Item>
        <List.Item 
          thumb={<Icon type={require('../../icons/remind_fill.svg')} size="md" />}
          arrow="horizontal"
          extra={<Badge text={88} overflowCount={99} />}
        >未读消息</List.Item>
      </List>
    </div>
  )
}

export default Component;