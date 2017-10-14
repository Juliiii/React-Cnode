export default {
  path: '/login',
  getComponent (location, callback) {
    import('../../pages/Login').then(module => callback(null, module.default));
  }
}
