export default {
  path: '/mine/reply',
  getComponent (location, callback) {
    import('../../pages/Mine/Reply').then(module => callback(null, module.default));
  }
}
