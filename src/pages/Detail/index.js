import React from 'react'
import { Popup, Toast } from 'antd-mobile';
import Loading from '../../components/Loading';
import { BackNavBar } from '../../components/NavBar';
import BackTop from './components/BackTop';
import Comment from './components/Comment';
import Comments from './components/Comments';
import PopupContent from './components/PopupContent';
import Owner from './components/Owner';
import Content from './components/Content';
import { inject, observer } from 'mobx-react';

// fix touch to scroll background page on iOS
// https://github.com/ant-design/ant-design-mobile/issues/307
// https://github.com/ant-design/ant-design-mobile/issues/163
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let maskProps;
if (isIPhone) {
  // Note: the popup content will not scroll.
  maskProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

@inject(({status, detail, session})=>({
  loading: status.loading,
  getDetail: detail.getDetail,
  comment: detail.comment,
  ups: detail.ups,
  setBackTopShow: detail.setBackTopShow,
  accesstoken: session.accesstoken
}))
@observer
class Detail extends React.Component {
  constructor (props) {
    super(props);
    document.body.style.overflowY = 'auto';
  }

  componentWillMount () {
    this.props.getDetail({id : this.props.params.id});
  }
  
  onScroll = () => {
    const node = document.documentElement || document.body;
    const scrollTop = node.scrollTop;
    const height = node.clientHeight;
    this.props.setBackTopShow(scrollTop > height - 30);
  }

  onClose = () => {
    Popup.hide();
  }

  onComment = (...arg) => {
    if (!this.props.accesstoken) {
      Toast.info('请先登录', 1);
      return;
    }
    const props = {
      onPublish: this.onPublish
    }

    if (arg.length) {
      props.reply_id = arg[0].id;
      props.loginname = arg[0].author.loginname;
    }

    Popup.show(<PopupContent {...props} />, { animationType: 'slide-up', maskProps });
  }

  onPublish = (content, reply_id) => {
    if (content === '') {
      Toast.info('不能为空', 1);
      return;
    }
    this.props.comment({content, reply_id, topic_id: this.props.params.id});

    this.onClose();
  }

  onUps = (id) => {
    if (!this.props.accesstoken) {
      Toast.info('请先登录', 1);
      return;
    }
    this.props.ups({reply_id: id});
  }

  render () {
    const { loading } = this.props;
    if (loading) {
      return ( <Loading /> );
    } else {
      return (
        <div style={{height: '100%'}}>
          <BackNavBar title="主题详情" />
          <div style={{paddingTop: '.9rem'}}>
            <Owner />
            <Content />
            <Comments onComment={this.onComment} onUps={this.onUps} onScroll={this.onScroll} />
            <BackTop />
            <Comment onComment={this.onComment} />
          </div>
        </div>
      );
    }
  }
}

export default Detail;
