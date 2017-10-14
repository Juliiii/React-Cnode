export default {
  path: '/mine',
  indexRoute:{
    getComponent (location, callback) {
      import('../../pages/Mine').then(module => callback(null, module.default));
    }
  }
}
