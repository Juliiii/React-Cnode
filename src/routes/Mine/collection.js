export default {
  path: 'collection',
  getComponent (location, callback) {
    import('../../pages/Mine/Collection').then(module => callback(null, module.default));
  }
}
