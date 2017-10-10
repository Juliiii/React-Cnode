import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { user } from '../../store/actions';
import { inject, observer } from 'mobx-react';
import Wrapper from './StateLess';

@inject(({user, status}) => ({
  data: user.info.recent_topics,
  loading: status.loading,
  getData: user.getInfo
}))
@observer
class Topics extends Component {
  render () {
    return <Wrapper {...this.props} title="最近主题" />
  }
};

export default Topics;

// const mapStateToProps = (state) => ({
//   // data: state.user.info.recent_topics,
//   // loading: state.status.loading
// // });

// // const mapDispatchToProps = (dispatch) => ({
//   // getData () {
  // //  dispatch(user.getuserInfo()); 
//   // }
// // });
  
// // export default connect(mapStateToProps, mapDispatchToProps)(Topics);
