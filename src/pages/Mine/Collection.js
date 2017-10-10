import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { user } from '../../store/actions';
import Wrapper from './StateLess';
import { inject, observer } from 'mobx-react';

@inject(({collections, status}) => ({
  data: collections.collections,
  getData: collections.getCollections,
  loading: status.loading
}))
@observer
class Collections extends Component {
  render () {
    return <Wrapper {...this.props} title="我的收藏" />
  }
};

export default Collections;

// const mapStateToProps = (state) => ({
//   // data: state.user.collections,
//   // loading: state.status.loading
// // });

// // const mapDispatchToProps = (dispatch) => ({
//   // getData () {
  // //  dispatch(user.getCollections()); 
//   // }
// // });
  
// // export default connect(mapStateToProps, mapDispatchToProps)(Collections);
