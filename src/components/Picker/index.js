import React from 'react'
import { Picker, List } from 'antd-mobile';

export const TabPicker = (props) => {
  const data = [
    {label: '问答', value: 'ask'},
    {label: '分享', value: 'share'},
    {label: '工作', value: 'job'},
    {label: '测试', value: 'dev'}
  ];

  return(
    <div>
      <List>
        <Picker
          title="选择主题"
          data={data}
          cols={1}
          onChange={(e) => console.log(e)}
          onOk={(e) => console.log(e)}
          onDismiss={(e) => console.log(e)}
        >
          <List.Item>选择主题</List.Item>
        </Picker>
      </List>
    </div>
  )
}

export default TabPicker;