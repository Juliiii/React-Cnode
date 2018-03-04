import React from 'react';
import { inject, observer } from 'mobx-react';
import Loading from '../../components/Loading'

@inject(({status}) => ({
  loading: status.loading
}))
@observer
class App extends React.Component {

  render () {
    const {loading, children} = this.props;
    return (
      <div style={{
        position: 'relative',
        width: '100vw',
        height: '100vh'
      }}
      >
        {loading && <Loading text="加载中..." />}
        {children}
      </div>
    );
  }
}

export default App;
