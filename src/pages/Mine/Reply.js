import React, { Component } from 'react';
import List from '../../components/List';
import Navbar from '../../components/NavBar';
import { connect } from 'react-redux';
import { user } from '../../store/actions'

class Topics extends Component {
  componentWillMount () {
    this.props.getData(); 
  }

  render () {
    const { data } = this.props;
    return (
      <div>
        <Navbar title="最近回复" />
        <List data={data ? data : []} />
      </div>
    );
  }
};


const mapStateToProps = (state) => ({
  data: state.user.info.recent_replies
})

const mapDispatchToProps = (dispatch) => {
  return {
    getData () {
      dispatch(user.getuserInfo());
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Topics);

