import React, { Component } from 'react';
import List from '../../components/List';
import { BackNavBar } from '../../components/NavBar';
import Loading from '../../components/Loading';
import ListItem from '../../components/ListItem';


export default class Stateless extends Component {
  componentWillMount () {
    this.props.getData({});
  }

  render () {
    const { loading, title, _loading, loadMore, data } = this.props;
    if (loading) return <Loading />
    return (
      <div>
        <BackNavBar title={title} />
        <div style={{padding: '.9rem 0 0 0'}}>
          <List 
            data={data} 
            ListItem={ListItem} 
            disableRefresh 
            loading={_loading} 
            getData={loadMore} 
          />
        </div>
      </div>
    );
  }
};
