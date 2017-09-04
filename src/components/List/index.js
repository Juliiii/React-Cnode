import React from 'react'
import { ListView, ActivityIndicator, Flex, RefreshControl } from 'antd-mobile';
import ListItem from '../ListItem';
import { connect } from 'react-redux';
import { topics } from '../../store/actions';


const MyBody = (props) => (
  <div>{props.children}</div>
);

const Footer = ({loading}) => {
  if (loading) {
    return (
      <Flex justify="center" style={{paddingBottom: '99px'}}>
        <ActivityIndicator text="Loading..." /> 
      </Flex>
    );
  } else {
    return null;
  }
};


class List extends React.Component {
  constructor (props) {
    super(props);
    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.data)
    }
  }
  componentWillMount () {
    if (this.props.data.length === 0) {
      this.props.getData();
    }
  }

  componentDidMount () {
    let scrollTop = localStorage.getItem('scrollTop');
    this.ref.refs.listview.scrollTo(0, scrollTop ? Number(scrollTop) : 0);
    this.ref.refs.listview.scrollProperties.offset = Number(scrollTop);
  }

  componentWillUnmount () {
    localStorage.setItem('scrollTop', this.ref.refs.listview.scrollProperties.offset);
  }

  componentWillReceiveProps (newProps) {
    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.setState({
      dataSource: dataSource.cloneWithRows(newProps.data)
    });
  }


  loadMore = () => {
    const { loading, reachEnd, refreshing } = this.props;
    if (loading || reachEnd || refreshing) return;
    this.props.getData();
  }

  refresh = () => {
    const { loading, refreshing } = this.props;
    if (loading || refreshing) return;
    this.props.refresh();
  }

  render () {
    return (
      <ListView
        ref={lv => this.ref = lv}
        dataSource={this.state.dataSource}
        initialListSize={10}
        pageSize={10}
        onEndReachedThreshold={20}
        scrollEventThrottle={200}
        renderBodyComponent={() => <MyBody />}
        onEndReached={this.loadMore}
        renderRow={(data) => <ListItem item={data} />}
        renderFooter={() => <Footer loading={this.props.loading} />}
        scrollerOptions={{ scrollbars: false }}
        refreshControl={
          <RefreshControl refreshing={this.props.refreshing} onRefresh={this.refresh} />
        }
        style={{
          height: `${(document.body.clientHeight || document.documentElement.clientHeight) - 87}px`
        }}
      />
    );
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getData: () => {
      dispatch(topics.setLoading());
      dispatch(topics.getTopics());
    },
    refresh: () => {
      dispatch(topics.setRefresh());
      dispatch(topics.refresh());
    }
  };
}


const mapStateToProps = (state, ownProps) => {
  return {
    page: state.topics.page,
    data: state.topics.data,
    loading: state.topics.loading,
    reachEnd: state.topics.reachEnd,
    refreshing: state.topics.refresh
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);