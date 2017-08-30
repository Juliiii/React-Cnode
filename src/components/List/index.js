import React from 'react'
import { ListView } from 'antd-mobile';
import ListItem from '../ListItem';
import { connect } from 'react-redux';
import { topics } from '../../store/actions';


const MyBody = (props) => (
  <div style={{
    paddingBottom: '99px'
  }}>{props.children}</div>
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
  componentWillMount () {
    if (this.props.data.length === 0) {
      this.props.getData();
    }
  }

  componentDidMount () {
    let scrollTop = localStorage.getItem('scrollTop');
    this.ref.scrollTo(0, scrollTop ? Number(scrollTop) : 0);
    localStorage.removeItem('scrollTop');
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
    console.log('trigger');
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
    }
  };
}


const mapStateToProps = (state, ownProps) => {
  return {
    page: state.topics.page,
    data: state.topics.data
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);