import React from 'react';
import { InputItem, TextareaItem, Tabs, Button, Picker, List } from 'antd-mobile';
import { topics } from '../../store/actions';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { SimpleNavbar } from '../../components/NavBar';

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

const data = [
  {label: '问答', value: 'ask'},
  {label: '分享', value: 'share'},
  {label: '工作', value: 'job'},
  {label: '测试', value: 'dev'}
];

class Publish extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      markdown: '',
      tab: [],
      error: {
        title: false,
        tab: true,
        content: false
      }
    };
  }

  componentWillMount() {
    if (!this.props.accesstoken) {
      browserHistory.replace('/login');
    }
  }



  handleContentChange = (value) => {
    this.setState({ 
      content: value,
      markdown: marked(value),
      error: {
        ...this.state.error,
        content: !value
      } 
    });
  }

  handleTitleChange = (title) => {
    this.setState({
      title,
      error: {
        ...this.state.error,
        title: !title || title.length < 10
      }
    });
  }

  handleTabChange = (tab) => {
    this.setState({
      tab,
      error: {
        ...this.state.error,
        tab: false
      }
    });
  }


  publish = () => {
    const { title, content, tab } = this.state;
    const payload = {
      title,
      content,
      tab: tab[0]
    };
    this.props.publish(payload);
  }


  render () {
    const { title, tab, error, markdown } = this.state;
    const { submitting } = this.props;

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
                height: '4.52rem'
              }}
              dangerouslySetInnerHTML={{__html: markdown}} 
            />
          </TabPane>
        </Tabs>
        <Button type="primary" disabled={error.content || error.title || error.tab || submitting} onClick={this.publish}>{ submitting ? '发布中...' : '发帖'}</Button>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    publish: (payload) => {
      dispatch(topics.publish(payload));
    }
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    submitting: state.status.submitting,
    accesstoken: state.user.accesstoken
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Publish);