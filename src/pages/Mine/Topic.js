import React, { Component } from 'react';
import { connect } from 'react-redux';
import { user } from '../../store/actions';
import Wrapper from './StateLess';

class Topics extends Component {
  render () {
    return <Wrapper {...this.props} title="最近主题" />
  }
};


const mapStateToProps = (state) => ({
  data: state.user.info.recent_topics,
  loading: state.status.loading
});

const mapDispatchToProps = (dispatch) => ({
  getData () {
   dispatch(user.getuserInfo()); 
  }
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Topics);
