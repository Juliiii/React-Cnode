import React, { Component } from 'react';
import List from '../../components/List';
import Navbar from '../../components/NavBar';
import Loading from '../../components/Loading';


export default class Stateless extends Component {
  componentWillMount () {
    this.props.getData();
  }

  render () {
    const { data, loading, title } = this.props;
    if (loading) return <Loading />
    return (
      <div>
        <Navbar title={title} />
        <div style={{paddingTop: '.9rem'}}>
          <List data={data ? data : []} />
        </div>
      </div>
    );
  }
};
