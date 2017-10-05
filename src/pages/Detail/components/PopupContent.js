import React from 'react'
import { TextareaItem, Button } from 'antd-mobile';

class PopupContent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      content: this.props.reply_id ? `@${this.props.loginname} ` : ''
    }
  }

  onChange = (content) => {
    this.setState({
      content
    });
  }

  onPublish = () => {
    this.props.onPublish && this.props.onPublish(this.state.content, this.props.reply_id);
  }


  render () {
    const { content } = this.state;    
    const { submitting } = this.props;
    return (
      <div>
        <TextareaItem
          value={content}
          placeholder="评论或回复一下吧"
          autoFocus
          rows={6}
          onChange={this.onChange}
        />
        <Button 
          type="primary"
          disabled={submitting}
          onClick={this.onPublish}
        >{submitting ? '提交中...' : '确定'}
        </Button>
      </div>
    );
  }
}

export default PopupContent;