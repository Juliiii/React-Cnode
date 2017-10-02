export default {
 path: '/detail/:id',
 getComponent (location, callback) {
  import('../../pages/Detail').then(module => callback(null, module.default));
 } 
}
