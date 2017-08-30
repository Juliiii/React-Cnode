import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/reset.css';
import Layout from './layouts';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import { Provider } from 'react-redux';


ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
