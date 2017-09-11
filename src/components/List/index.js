import React from 'react'
import { ListView, RefreshControl } from 'antd-mobile';
import ListItem from '../ListItem';
import Loading from '../Loading';

const MyBody = (props) => (
  <div>{props.children}</div>
);

const Footer = () => (
  <Loading style={{paddingBottom: '99px'}} text="加载中..." />
);

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

  componentWillUnmount () {
    if (this.props.saveScrollTop) {
      this.props.saveScrollTop(this.ref.refs.listview.scrollProperties.offset);
    }
  }

  loadMore = () => {
    const { loading, reachEnd, refresh, getData } = this.props;
    if (loading || reachEnd || refresh) return;
    getData && getData();
  }

  refresh = () => {
    const { loading, refresh, onRefresh } = this.props;
    if (loading || refresh) return;
    onRefresh && onRefresh();
  }

  render () {
    const { loading, refresh } = this.props;
    const { dataSource } = this.state;
    return (
      <ListView
        ref={lv => this.ref = lv}
        dataSource={dataSource}
        initialListSize={10}
        pageSize={10}
        stickySectionHeadersEnabled={false}
        onEndReachedThreshold={20}
        scrollEventThrottle={500}
        renderBodyComponent={() => <MyBody />}
        onEndReached={this.loadMore}
        renderRow={(data) => <ListItem item={data} />}
        renderFooter={() => loading ? <Footer loading={loading} /> : null}
        refreshControl={
          refresh ? <RefreshControl refreshing={refresh} onRefresh={this.refresh} /> : null
        }
        style={{
          height: `${(document.body.clientHeight || document.documentElement.clientHeight) - 87}px`
        }}
      />
    );
  };
}

export default List;