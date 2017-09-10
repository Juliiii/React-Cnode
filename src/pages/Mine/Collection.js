import React, { Component } from 'react';
import List from '../../components/List';
import Navbar from '../../components/NavBar';

class Collection extends Component {
  componentDidMount () {

  }

  render () {
    return (
      <div>
        <Navbar title="我的收藏" />
        {/* <List /> */}
      </div>
    );
  }
};

export default Collection;
