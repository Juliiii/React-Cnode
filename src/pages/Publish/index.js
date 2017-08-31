import React from 'react';
import TabPicker from '../../components/Picker';
import { InputItem, TextareaItem, Tabs, Button } from 'antd-mobile';
import marked from 'marked';

const TabPane = Tabs.TabPane;

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

class Publish extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: '',
      content: ''
    };
  }
  handleChange = (value) => {
    this.setState({ content: marked(value) })
    console.log(this.state.content);
  }
  render () {
    return (
      <div>
        <InputItem
          placeholder="最少10个字"
          clear={true}
          value={this.state.value}
          onChange={e => {
            this.setState({
              value: e
            });
            }}
        >标题</InputItem>
        <TabPicker />
        <Tabs defaultActiveKey="1" style={{margin: '.5rem 0'}}>
          <TabPane tab="正文" key="1">
            <TextareaItem placeholder="支持markdown" autoHeight={true} onChange={this.handleChange} />
          </TabPane>
          <TabPane tab="预览" key="2">
            <div
              style={{
                padding: '0.23rem 0 0.21rem 0.3rem',
                backgroundColor: 'white',
                minHeight: '0.88rem',
                boxSizing: 'border-box'
              }}
              dangerouslySetInnerHTML={{__html: this.state.content}} />
          </TabPane>
        </Tabs>
        <Button type="primary">发帖</Button>
      </div>
    );
  }
};

export default Publish;