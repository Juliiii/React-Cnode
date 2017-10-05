import React from 'react'
import { Icon, Card, Flex, Popup, Toast, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { topics } from '../../store/actions';
import Loading from '../../components/Loading';
import List from '../../components/List';
import ListItem from '../../components/CommentListItem';
import { BackNavBar } from '../../components/NavBar';
import PopupContent from './components/PopupContent';
import { formatime, throttle } from '../../utils';

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

const title = (props) => (
  <Flex direction="column" align="start" style={{width: '100%'}}>
    <span>{props.title}</span>
    <Flex justify="between" style={{width: '100%', paddingTop: '0.2rem'}}>
      <Flex style={{ fontSize: '0.28rem', color: '#888'}}>
        <span>发布于{formatime(props.create_at)}</span>
        <Flex align="center" style={{marginLeft: '.1rem'}}>
          <Icon type={require('../../icons/browse.svg')} />
          {props.visit_count}
        </Flex>
        <Flex align="center" style={{marginLeft: '.1rem'}}>
          <Icon type={require('../../icons/message.svg')} />
          {props.reply_count}
        </Flex>
      </Flex>
      { !props.accesstoken ? null :
        <div>
          {!props.is_collect && <Icon type={require('../../icons/collection.svg')} onClick={() => props.collect(props.id)} />}
          {props.is_collect && <Icon type={require('../../icons/collection_fill.svg')} onClick={() => props.decollect(props.id)} />}
        </div>
      }
    </Flex>
  </Flex>
);

class Detail extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: false,
      reachEnd: false,
      backTopShow: false,
      allData: [],
      data: [],
      limit: 10
    }
    document.body.style.overflowY = 'auto';
  } 

  componentWillMount () {
    this.props.getDetail(this.props.params.id);
  }

  componentDidMount () {
    const node = document.body;
    node.onscroll = throttle(() => {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.body.clientHeight || document.documentElement.clientHeight;
      this.setState({
        backTopShow: scrollTop > height - 30
      });
      
      // 只能手动判断到底底部了，kuku
      const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
      const clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
      if (scrollHeight <= clientHeight + scrollTop + 450) {
        this.loadMore();
      }

    }, 200);
  }

  componentWillReceiveProps (nextProps) {
    const { detail: {replies} } = nextProps;
    const { limit } = this.state;
    if (!replies) return;
    const _replies = [...replies];
    this.setState({
      allData: _replies,
      data: _replies.splice(0, limit),
      reachEnd: _replies.length === 0
    });
  }

  componentWillUnmount () {
    const node = document.body;
    node.onscroll = null;
  }

  backTop = (e) => {
    e.preventDefault();
    this.setState({backTopShow: false});
    window.scrollTo(0, 0);
  }


  loadMore = () => {
    const { allData: _allData, data: _data, loading, reachEnd, limit } = this.state;
    if (loading || reachEnd) return;
    this.setState({
      loading: true
    });
    const allData = [..._allData];
    const oldData = [..._data];
    const data = allData.splice(0, limit);
    this.setState((preState) => ({
      allData,
      data: [...oldData, ...data],
      reachEnd: allData.length === 0
    }));
    setTimeout(() => this.setState({
      loading: false
    }), 100);
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
    this.props.ups(id);
  }

  render () {
    const { loading, detail, accesstoken, collect, decollect } = this.props;
    const { backTopShow } = this.state;
    if (loading) {
      return ( <Loading /> );
    } else {
      const { author } = detail;
      const { data } = this.state;
      const loginname = author ? author.loginname : '';
      const avatar_url = author ? author.avatar_url: '';
      return (
        <div style={{height: '100%'}}>
          <BackNavBar title="主题详情" />
          <div style={{paddingTop: '.9rem'}}>
            <Card style={{minHeight: 'auto', marginTop: '.1rem'}}>
              <Card.Header
                thumb={avatar_url}
                title={loginname}
                extra={<span style={{fontSize: '.3rem'}}>楼主</span>}
                thumbStyle={{height: '.6rem', width: '.6rem'}}
              />
            </Card>
            <Card style={{padding: '0 0.2rem .2rem', marginTop: '.1rem'}}>
              <Card.Header 
                title={title({...detail, accesstoken, collect, decollect})}
                style={{borderBottom: '1px solid #bfbfbf', marginBottom: '.2rem'}} 
              />
              <div dangerouslySetInnerHTML={{
                __html: detail.content
              }}
              />
            </Card>
            <Card style={{padding: '0 0.3rem .2rem', margin: '.1rem 0'}}>
              <Card.Header 
                  style={{width: '100%', paddingLeft: '0'}}
                  title="评论"
              />
              { data.length
              ? <List 
                  data={data} 
                  onComment={this.onComment}
                  onUps={this.onUps}
                  useBodyScroll
                  disabledRefresh
                  disabledLoadMore
                  ListItem={ListItem}
                />
              : <Flex align="center" justify="center" style={{fontSize: '.3rem', color: '#bfbfbf'}}>暂时没有评论</Flex>
              }
            </Card>
            { backTopShow 
              ? <Button 
                  style={{
                    position: 'fixed',
                    right: '.2rem',
                    bottom: '1.5rem',
                    borderRadius: '50%',
                    height: '.9rem',
                    width: '.9rem',
                    padding: '0',
                    zIndex: '99'
                  }}
                  type="text"
                  size="small"
                  onClick={this.backTop}
                >
                  <Flex align="center" justify="center" style={{height: '100%'}}>
                    <Icon type={require('../../icons/back-top.svg')} size="md" />
                  </Flex>
                </Button>
              : null
            }
            <Button 
              style={{
                position: 'fixed',
                right: '.2rem',
                bottom: '.4rem',
                borderRadius: '50%',
                height: '.9rem',
                width: '.9rem',
                lineHeight: '.9rem',
                textAlign: 'center',
                padding: '0',
                zIndex: '99'
              }}
              type="primary"
              size="small"
              onClick={() => this.onComment()}
            >评论
            </Button>
          </div>
        </div>
      );
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getDetail: (id) => {
      dispatch(topics.getDetail(id));
    },
    collect: (topic_id) => {
      dispatch(topics.collect(topic_id));
    },
    decollect: (topic_id) => {
      dispatch(topics.decollect(topic_id));
    },
    ups: (id) => {
      dispatch(topics.ups(id));
    },
    comment: (obj) => {
      dispatch(topics.comment(obj));
    }
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.status.loading,
    detail: state.topics.detail,
    accesstoken: state.user.accesstoken
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);