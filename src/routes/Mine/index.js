import Reply from './reply';
import Topic from './topic';
import Collection from './collection';

export default {
  path: 'mine',
  indexRoute:{
    getComponent (location, callback) {
      import('../../pages/Mine').then(module => callback(null, module.default));
    }
  },
  childRoutes: [
    Reply,
    Topic,
    Collection
  ]
}
