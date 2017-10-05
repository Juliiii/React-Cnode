import React from 'react'
import { ListView, RefreshControl } from 'antd-mobile';
import Loading from '../Loading';
import PropTypes from 'prop-types';

const MyBody = (props) => (
  <div>{props.children}</div>
);

const Footer = () => (
  <Loading text="加载中..." />
);

class List extends React.Component {
  static propTypes = {
    disableRefresh: PropTypes.bool,
    disableLoadMore: PropTypes.bool,
    reachEnd: PropTypes.bool,
    loading: PropTypes.bool,
    refresh: PropTypes.bool,
    onRefresh: PropTypes.func,
    getData: PropTypes.func,
    useBodyScroll: PropTypes.bool,
    saveScrollTop: PropTypes.func,
    ListItem: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired
  }

  static defaultProps = {
    disableRefresh: false,
    disableLoadMore: false,
    reachEnd: false,
    loading: false,
    refresh: false,
    useBodyScroll: false,
    onRefresh () {},
    getData () {},
    saveScrollTop () {},
    ListItem () {},
    data: []
  }

  constructor (props) {
    super(props);
    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.data)
    }
  }

  componentDidMount = () => {
    if (this.props.firstCome) {
      const scrollTop = localStorage.getItem('scrollTop');
      if (scrollTop) {
        this.ref.refs.listview.scrollTo(0, Number(scrollTop));
        this.ref.refs.listview.scrollProperties.offset = Number(scrollTop);
      }
    }
  }

  componentWillReceiveProps (newProps) {
    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.setState({
      dataSource: dataSource.cloneWithRows(newProps.data)
    });
  }

  shouldComponentUpdate (nextProps, nextState) {
    return true;
  }

  componentWillUnmount () {
    if (this.props.saveScrollTop) {
      this.props.saveScrollTop(this.ref.refs.listview.scrollProperties.offset);
    }
  }

  loadMore = () => {
    const { loading, reachEnd, refresh, getData, disableLoadMore } = this.props;
    if (disableLoadMore || loading || reachEnd || refresh) return;
    getData && getData();
  }

  refresh = () => {
    const { loading, refresh, onRefresh, disableRefresh } = this.props;
    if (disableRefresh || loading || refresh) return;
    onRefresh && onRefresh();
  }

  render () {
    const { loading, refresh, disableRefresh, disableLoadMore, useBodyScroll, ListItem, data } = this.props;
    const { dataSource } = this.state;
    if (useBodyScroll) {
      return (
        <ListView
          ref={lv => this.ref = lv}
          dataSource={dataSource}
          initialListSize={data.length}
          useBodyScroll
          onEndReached={disableLoadMore ? null : this.loadMore}
          renderRow={(rowData) => <ListItem item={rowData} {...this.props} />}
          renderFooter={() => loading ? <Footer loading={loading} /> : null}
        />
      );
    }
    return (
      <ListView
        ref={lv => this.ref = lv}
        dataSource={dataSource}
        initialListSize={10}
        pageSize={10}
        stickySectionHeadersEnabled={false}
        onEndReachedThreshold={80}
        scrollEventThrottle={500}
        renderBodyComponent={() => <MyBody />}
        onEndReached={disableLoadMore ? null : this.loadMore}
        renderRow={(rowData) => <ListItem item={rowData} {...this.props} />}
        renderFooter={() => loading ? <Footer loading={loading} /> : null}
        refreshControl={
          !disableRefresh ? <RefreshControl refreshing={refresh} onRefresh={this.refresh} /> : null
        }
        style={{
          height: `${(document.body.clientHeight || document.documentElement.clientHeight) - 87}px`
        }}
      />
    );
  };
}

export default List;