import React, { Component } from 'react';
import List from '../../components/List';
import Navbar from '../../components/NavBar';
import { connect } from 'react-redux';
import { user } from '../../store/actions';



class Collections extends Component {
  componentWillMount () {
    this.props.getData();
  }

  render () {
    const { collections } = this.props;
    return (
      <div>
        <Navbar title="我的收藏" />
        <List data={collections ? collections : []} />
      </div>
    );
  }
};


const mapStateToProps = (state) => ({
  collections: state.user.collections
});

const mapDispatchToProps = (dispatch) => ({
  getData () {
   dispatch(user.getCollections()); 
  }
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Collections);
