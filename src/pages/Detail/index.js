import React from 'react'
import { Icon, Card, Flex, Popup, TextareaItem, Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import { topics } from '../../store/actions';
import Loading from '../../components/Loading';
import CommentList from '../../components/CommentList';
import NavBar from '../../components/NavBar';
import { formatime } from '../../utils';

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

const PopupContent = () => (
  <div>
    <TextareaItem
      placeholder="回复xxx"
      autoFocus
      rows={6}
    />
  </div>
);

class Detail extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: false,
      reachEnd: false,
      allData: [],
      data: []
    }
  } 


  componentWillMount () {
    this.props.getDetail(this.props.params.id);
  }

  componentWillReceiveProps (nextProps) {
    const { detail: {replies} } = nextProps;
    if (!replies || replies.length === 0) return;
    const _replies = [...replies];
    this.setState({
      allData: _replies,
      data: _replies.splice(0, 5),
      reachEnd: _replies.length === 0
    });
  }

  loadMore = () => {
    const allData = [...this.state.allData];
    const oldData = [...this.state.data];
    const data = allData.splice(0, 5);
    this.setState((preState) => ({
      allData,
      data: [...oldData, ...data],
      reachEnd: allData.length === 0
    }));
  }

  onClose = () => {
    Popup.hide();
  }

  onComment = () => {
    if (!this.props.accesstoken) {
      Toast.info('请先登录', 1);
      return;
    }
    Popup.show(<PopupContent />, { animationType: 'slide-up', maskProps });
  }

  render () {
    const { loading, detail, accesstoken, collect, decollect } = this.props;
    if (loading) {
      return ( <Loading /> );
    } else {
      const { author } = detail;
      const {reachEnd, data, loading : _loading} = this.state;
      const loginname = author ? author.loginname : '';
      const avatar_url = author ? author.avatar_url: '';
      return (
        <div>
          <NavBar title="主题详情" />
          <div style={{paddingTop: '.9rem'}}>
            <Card style={{minHeight: 'auto', marginTop: '.1rem'}}>
              <Card.Header
                thumb={avatar_url}
                title={loginname}
                extra={<span style={{fontSize: '.3rem'}}>楼主</span>}
                thumbStyle={{height: '.6rem', width: '.6rem'}}
              />
            </Card>
            <Card style={{padding: '0 0.4rem .2rem', marginTop: '.1rem'}}>
              <Card.Header 
                title={title({...detail, accesstoken, collect, decollect})}
                style={{borderBottom: '1px solid #bfbfbf', marginBottom: '.2rem'}} 
              />
              <div dangerouslySetInnerHTML={{
                __html: detail.content
              }}
              />
            </Card>
            <Card style={{padding: '0 0.4rem .2rem', margin: '.1rem 0'}}>
              <Card.Header 
                  style={{width: '100%', paddingLeft: '0'}}
                  title="评论"
              />
              <CommentList 
                data={data ? data : []} 
                loading={_loading} 
                reachEnd={reachEnd} 
                getData={this.loadMore}
                onComment={this.onComment}
              />
            </Card>
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
    }
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.status.loading,
    submitting: state.status.submitting,
    detail: state.topics.detail,
    accesstoken: state.user.accesstoken
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);