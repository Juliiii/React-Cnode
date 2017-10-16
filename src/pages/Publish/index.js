import React from 'react';
import { SimpleNavbar } from '../../components/NavBar';
import Success from './Success';
import { InputItem, TextareaItem, Tabs, Button, Picker, List } from 'antd-mobile';
import { inject, observer } from 'mobx-react';


const TabPane = Tabs.TabPane;

const data = [
  {label: '问答', value: 'ask'},
  {label: '分享', value: 'share'},
  {label: '工作', value: 'job'},
  {label: '测试', value: 'dev'}
];

@inject(({publish, status}) => ({
  publish,
  submitting: status.submitting
}))
@observer
class Publish extends React.Component {

  componentWillUnmount () {
    this.props.publish.resetFinish();
  }

  handleContentChange = (value) => {
    this.props.publish.handleChange('content', value);
  }

  handleTitleChange = (value) => {
    this.props.publish.handleChange('title', value);
  }

  handleTabChange = (tab) => {
    this.props.publish.handleChange('tab', tab);
  }


  publish = () => {
    this.props.publish.publish();
  }


  render () {
    const { title, tab, error, markdown, canSubmit, finish } = this.props.publish;
    const { submitting } = this.props;
    if (finish) return <Success />;
    return (
      <div>
        <SimpleNavbar title="发布" />
        <InputItem
          placeholder="最少10个字"
          clear
          error={error.title}
          value={title}
          onChange={this.handleTitleChange}
        >标题
        </InputItem>
        <List>
          <Picker
            title="选择主题"
            data={data}
            value={tab}
            cols={1}
            onOk={this.handleTabChange}
          >
            <List.Item>选择主题</List.Item>
          </Picker>
        </List>
        <Tabs defaultActiveKey="1" style={{margin: '.5rem 0'}} swipeable={false}>
          <TabPane tab="正文" key="1">
            <TextareaItem 
              placeholder="支持markdown" 
              rows={8}
              error={error.content} 
              onChange={this.handleContentChange} 
            />
          </TabPane>
          <TabPane tab="预览" key="2">
            <div
              style={{
                padding: '0.23rem 0 0.21rem 0.3rem',
                backgroundColor: 'white',
                boxSizing: 'border-box',
                wordWrap: 'break-word',
                wordBreak: 'break-all',
                height: '4.52rem'
              }}
              dangerouslySetInnerHTML={{__html: markdown}} 
            />
          </TabPane>
        </Tabs>
        <Button type="primary" disabled={!canSubmit || submitting} onClick={this.publish}>{ submitting ? '发布中...' : '发帖'}</Button>
      </div>
    );
  }
};

export default Publish;
