import React, { Component } from 'react';
import { connect } from 'react-redux';
import { user } from '../../store/actions';
import Wrapper from './StateLess';

class Replys extends Component {
  render () {
    return <Wrapper {...this.props} title="最近回复" />
  }
};


const mapStateToProps = (state) => ({
  data: state.user.info.recent_replies,
  loading: state.status.loading
});

const mapDispatchToProps = (dispatch) => {
  return {
    getData () {
      dispatch(user.getuserInfo());
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Replys);

