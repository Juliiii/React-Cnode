import Homepage from '../Homepage';
import Login from '../Login';
import Mine from '../Mine';
import Publish from '../Publish';
import Success from '../Publish/success';

export default {
  path: '/',
  indexRoute:{
    getComponent (location, callback) {
      import('../../pages/Main/Default').then(module => {
        callback(null, module.default)
      });
    }
  },
  getComponent (location, callback) {
    import('../../pages/Main').then(module => {
      callback(null, module.default)
    });
  },
  childRoutes: [
    Homepage,
    Login,
    Mine,
    Publish,
    Success    
  ]
}