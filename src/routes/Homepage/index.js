export default {
  path: '/user/:loginname',
  getComponent (location, callback) {
    import('../../pages/Homepage').then(module => callback(null, module.default));
  }
}
