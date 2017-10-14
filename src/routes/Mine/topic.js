export default {
  path: '/mine/topic',
  getComponent (location, callback) {
    import('../../pages/Mine/Topic').then(module => callback(null, module.default));
  }
}
