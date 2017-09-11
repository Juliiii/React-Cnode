import React, { Component } from 'react';
import List from '../../components/List';
import Navbar from '../../components/NavBar';
import { connect } from 'react-redux';
import { user } from '../../store/actions'
import Loading from '../../components/Loading';

class Topics extends Component {
  componentWillMount () {
    this.props.getData(); 
  }

  render () {
    const { data, loading } = this.props;
    if (loading) return <Loading />
    return (
      <div>
        <Navbar title="最近回复" />
        <List data={data ? data : []} />
      </div>
    );
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


export default connect(mapStateToProps, mapDispatchToProps)(Topics);

