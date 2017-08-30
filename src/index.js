import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/reset.css';
import Layout from './layouts';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
store.dispatch({
  type: 'LOGIN',
  a: '2'
});
ReactDOM.render(<Layout />, document.getElementById('root'));
registerServiceWorker();
