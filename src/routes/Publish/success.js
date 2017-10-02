export default {
  path: 'success',
  getComponents (location, callback) {
    import('../../pages/Publish/Success').then(module => callback(null, module.default));
  }
}
