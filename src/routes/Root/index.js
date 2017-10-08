// import Detail from '../Detail';
// import Main from '../Main';
import Login from '../Login';

export default [
  // Main,
  // Detail
  {
    path: '/',
    getComponent (location, callback) {
      import('../../pages/Login').then(module => callback(null, module.default));
    }
  },
  Login
];
