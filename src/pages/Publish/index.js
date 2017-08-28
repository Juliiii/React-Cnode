import React from 'react';
import TabPicker from '../../components/Picker';
import { InputItem } from 'antd-mobile';

class Publish extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  render () {
    return (
      <div>
        <InputItem
          clear={true}
          value={this.state.value}
          onChange={e => {
            this.setState({
              value: e
            });
            }}
        >标题</InputItem>
        <TabPicker />
      </div>
    );
  }
};

export default Publish;