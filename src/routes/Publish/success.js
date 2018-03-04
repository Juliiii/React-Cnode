export default {
  path: '/publish/success',
  getComponent (location, callback) {
    import('../../pages/Publish/Success').then(module => callback(null, module.default));
  }
}
