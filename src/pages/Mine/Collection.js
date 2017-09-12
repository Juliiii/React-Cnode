import React, { Component } from 'react';
import { connect } from 'react-redux';
import { user } from '../../store/actions';
import Wrapper from './StateLess';

class Collections extends Component {
  render () {
    return <Wrapper {...this.props} title="我的收藏" />
  }
};


const mapStateToProps = (state) => ({
  data: state.user.collections,
  loading: state.status.loading
});

const mapDispatchToProps = (dispatch) => ({
  getData () {
   dispatch(user.getCollections()); 
  }
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Collections);
