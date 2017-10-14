export default {
  path: '/mine/collection',
  getComponent (location, callback) {
    import('../../pages/Mine/Collection').then(module => callback(null, module.default));
  }
}
