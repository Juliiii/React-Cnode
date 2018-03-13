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
    refreshing: PropTypes.bool,
    refresh: PropTypes.func,
    getData: PropTypes.func,
    useBodyScroll: PropTypes.bool,
    saveScrollTop: PropTypes.func,
    ListItem: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    onScroll: PropTypes.func,
    firstCome: PropTypes.bool,
    height: PropTypes.number
  }

  static defaultProps = {
    disableRefresh: false,
    disableLoadMore: false,
    reachEnd: false,
    loading: false,
    refreshing: false,
    useBodyScroll: false,
    firstCome: false,
    height: document.documentElement ? document.documentElement.clientHeight - 87 - 99 : document.body.clientHeight - 87 - 99,
    refresh () {},
    getData () {},
    saveScrollTop () {},
    ListItem () {},
    onScroll () {},
    data: {}
  }

  constructor (props) {
    super(props);
    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.data.slice())
    }
  }

  componentDidMount = () => {
    // if (this.props.firstCome) {
    //   const scrollTop = localStorage.getItem('scrollTop');
    //   if (scrollTop) {
    //     this.ref.refs.listview.scrollTo(0, Number(scrollTop));
    //     this.ref.refs.listview.scrollProperties.offset = Number(scrollTop);
    //   }
    // }

    if (this.props.useBodyScroll) {
      window.addEventListener('scroll', this._onScroll);
    }
  }

  componentWillReceiveProps (newProps) {
    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.setState({
      dataSource: dataSource.cloneWithRows(newProps.data.slice())
    });
  }

  componentWillUnmount () {
    if (this.props.saveScrollTop) {
      this.props.saveScrollTop(this.ref.refs.listview.scrollProperties.offset);
    }

    if (this.props.useBodyScroll) {
      window.removeEventListener('scroll', this._onScroll);
    }
  }

  loadMore = () => {
    const { getData, disableLoadMore } = this.props;
    if (disableLoadMore) return;
    getData && getData();
  }

  refresh = () => {
    const { refresh, disableRefresh } = this.props;
    if (disableRefresh) return;
    refresh && refresh();
  }

  _onScroll = () => {
    if (this._reachEnd()) {
      this.loadMore();
    }
    this.props.onScroll && this.props.onScroll();
  }

  _reachEnd = () => {
    const node = document.documentElement ? document.documentElement : document.body;
    const scrollHeight = node.scrollHeight;
    const scrollTop = node.scrollTop;
    const contentHeight = node.clientHeight;
    const onEndReachedThreshold = 30;
    return scrollTop + contentHeight + onEndReachedThreshold >= scrollHeight;
  }

  render () {
    const { loading, refreshing, disableRefresh, disableLoadMore, useBodyScroll, ListItem, data, height } = this.props;
    const { dataSource } = this.state;
    if (useBodyScroll) {
      return (
        <ListView
          ref={lv => this.ref = lv}
          dataSource={dataSource}
          initialListSize={data.length}
          pageSize={10}
          useBodyScroll
          renderRow={(rowData, sIndex, rIndex) => <ListItem item={rowData} {...this.props} index={rIndex} length={data.length} />}
          renderFooter={() => loading ? <Footer loading={loading} /> : null}
        />
      );
    } else {
      return (
        <ListView
          ref={lv => this.ref = lv}
          dataSource={dataSource}
          pageSize={10}
          initialListSize={100}
          stickySectionHeadersEnabled={false}
          onEndReachedThreshold={80}
          scrollEventThrottle={500}
          renderBodyComponent={() => <MyBody />}
          onEndReached={disableLoadMore ? null : this.loadMore}
          renderRow={(rowData, sIndex, rIndex) => <ListItem item={rowData} index={rIndex} length={data.length} {...this.props} />}
          renderFooter={() => loading ? <Footer loading={loading} /> : null}
          refreshControl={
            !disableRefresh ? <RefreshControl refreshing={refreshing} onRefresh={this.refresh} /> : null
          }
          style={{
            height: `${height}px`
          }}
        />
      );
    }
  };
}

export default List;