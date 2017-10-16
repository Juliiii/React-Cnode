import Mine from '../Mine';
import Publish from '../Publish';
import Message from '../Message';

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
    Mine,
    Publish,
    Message
  ]
}