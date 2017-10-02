export default {
  path: 'topic',
  getComponent (location, callback) {
    import('../../pages/Mine/Topic').then(module => callback(null, module.default));
  }
}
