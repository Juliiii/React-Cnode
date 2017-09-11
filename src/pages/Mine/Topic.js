import React, { Component } from 'react';
import List from '../../components/List';
import Navbar from '../../components/NavBar';
import { connect } from 'react-redux';
import { user } from '../../store/actions';
import Loading from '../../components/Loading';


class Topics extends Component {
  componentWillMount () {
    this.props.getData();
  }

  render () {
    const { topic, loading } = this.props;
    if (loading) return <Loading />;
    return (
      <div>
        <Navbar title="我的收藏" />
        <List data={topic ? topic : []} />
      </div>
    );
  }
};


const mapStateToProps = (state) => ({
  topic: state.user.info.recent_topics,
  loading: state.status.loading
});

const mapDispatchToProps = (dispatch) => ({
  getData () {
   dispatch(user.getuserInfo()); 
  }
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Topics);
