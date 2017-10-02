import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Layout from './router';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import { Provider } from 'react-redux';


ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>
, document.getElementById('root'));

registerServiceWorker();
