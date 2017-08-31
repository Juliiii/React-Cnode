import React from 'react'
import { NavBar, Icon, Card, Flex } from 'antd-mobile';
import { connect } from 'react-redux';
import { topics } from '../../store/actions';
import { browserHistory } from 'react-router';
import Loading from '../../components/Loading';
import { formatime } from '../../utils';

const title = (props) => (
  <Flex direction="column" align="start">
    <span>{props.title}</span>
    <Flex style={{ fontSize: '0.28rem', color: '#888', marginTop: '.2rem' }}>
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
  </Flex>
);

class Detail extends React.Component {
  componentDidMount () {
    this.props.getDetail(this.props.params.id);
  }

  render () {
    const { loading, detail } = this.props;
    if (loading) {
      return ( <Loading /> );
    }

    const { author } = detail;
    const loginname = author ? author.loginname : '';
    const avatar_url = author ? author.avatar_url: '';

    return (
      <div>
        <NavBar
          leftContent={<Icon type={require('../../icons/return.svg')} />}
          mode="light"
          iconName={null}
          onLeftClick={() => browserHistory.goBack()}
        >主题详情</NavBar>
        <Card style={{minHeight: 'auto', marginTop: '.1rem'}}>
          <Card.Header
          thumb={avatar_url}
          title={loginname}
          extra={<span style={{fontSize: '.3rem'}}>楼主</span>}
          thumbStyle={{height: '.6rem', width: '.6rem'}}
          />
        </Card>
        <Card style={{padding: '0 0.4rem', marginTop: '.1rem'}}>
          <Card.Header 
            title={title(detail)}
            style={{borderBottom: '1px solid #888'}} 
          />
          <div dangerouslySetInnerHTML={{
            __html: detail.content
          }}></div>
        </Card>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getDetail: (id) => {
      dispatch(topics.setLoading())
      dispatch(topics.getDetail(id));
    }
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.topics.loading,
    detail: state.topics.detail
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);