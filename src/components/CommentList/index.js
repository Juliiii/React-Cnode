import React from 'react'
import { ListView } from 'antd-mobile';
import ListItem from './ListItem';
import Loading from '../Loading';

const Footer = () => (
  <Loading text="加载中..." />
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

  componentWillReceiveProps (newProps) {
    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.setState({
      dataSource: dataSource.cloneWithRows(newProps.data)
    });
  }

  loadMore = () => {
    const { loading, reachEnd } = this.props;
    if (loading || reachEnd) return;
    this.props.getData && this.props.getData();
  }


  render () {
    const { loading, onComment } = this.props;
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
        useBodyScroll
        onEndReached={this.loadMore}
        renderRow={(rowData) => <ListItem {...rowData} onComment={onComment} />}
        renderFooter={() => loading ? <Footer loading={loading} /> : null}
      />
    );
  };
}

export default List;