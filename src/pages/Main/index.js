import React from 'react';
import TabBar from '../../components/TabBar';
import { connect } from 'react-redux';

class Main extends React.Component {
  render () {
    return (
      <div>
        <TabBar />
        {this.props.children}
      </div>
    );
  }
};


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
};

export default connect(mapStateToProps)(Main);
