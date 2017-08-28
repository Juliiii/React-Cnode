import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/reset.css';
import Layout from './layouts';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Layout />, document.getElementById('root'));
registerServiceWorker();
