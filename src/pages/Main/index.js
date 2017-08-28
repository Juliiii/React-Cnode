import React from 'react';
import TabBar from '../../components/TabBar';

class Main extends React.Component {
  render() {
    return (
      <div>
        <TabBar />
        {this.props.children}
      </div>
    );
  }
}


export default Main;
