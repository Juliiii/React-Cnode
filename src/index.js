import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './router';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import { Provider } from 'mobx-react';
import Demo from './pages/Mine/Message';

ReactDOM.render(
  <Provider {...store}>
    <Router />
  </Provider>
, document.getElementById('root'));

registerServiceWorker();
