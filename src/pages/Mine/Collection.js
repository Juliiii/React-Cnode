import React, { Component } from 'react';
import List from '../../components/List';
import Navbar from '../../components/NavBar';
import { connect } from 'react-redux';
import { user } from '../../store/actions';
import Loading from '../../components/Loading';


class Collections extends Component {
  componentWillMount () {
    this.props.getData();
  }

  render () {
    const { collections, loading } = this.props;
    if (loading) return <Loading />
    return (
      <div>
        <Navbar title="我的收藏" />
        <List data={collections ? collections : []} />
      </div>
    );
  }
};


const mapStateToProps = (state) => ({
  collections: state.user.collections,
  loading: state.status.loading
});

const mapDispatchToProps = (dispatch) => ({
  getData () {
   dispatch(user.getCollections()); 
  }
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Collections);
