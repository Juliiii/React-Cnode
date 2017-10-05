import React, { Component } from 'react';
import List from '../../components/List';
import { BackNavBar } from '../../components/NavBar';
import Loading from '../../components/Loading';
import ListItem from '../../components/ListItem';


export default class Stateless extends Component {
  constructor (props) {
    super();
    this.state = {
      sliceData: [],
      data: [],
      limit: 5,
      _loading: false,
      _hasMore: true
    }
  }

  
  componentWillMount () {
    this.props.getData();
  }
  componentWillReceiveProps (newProps) {
    this.genData(newProps.data, []);
  }

  loadMore = () => {
    if (this.state._loading) return;
    this.setState({
      _loading: true
    });
    this.genData(this.state.data, this.state.sliceData);
    setTimeout(() => this.setState({
      _loading: false
    }), 500);
  }

  genData = (_data, _sliceData) => {
    if (!_data || !_sliceData) return;
    const data = [..._data];
    const sliceData = [..._sliceData, ...data.splice(0, this.state.limit)];
    this.setState({
      data,
      sliceData,
      _hasMore: data.length !== 0
    });
  }

  render () {
    const { loading, title } = this.props;
    const { _loading, sliceData, _hasMore } = this.state;
    if (loading) return <Loading />
    return (
      <div>
        <BackNavBar title={title} />
        <div style={{padding: '.9rem 0 0 0'}}>
          <List 
            data={sliceData} 
            ListItem={ListItem} 
            disableRefresh 
            loading={_loading} 
            getData={this.loadMore} 
            reachEnd={!_hasMore} 
          />
        </div>
      </div>
    );
  }
};
