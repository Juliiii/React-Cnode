export default {
  path: 'message',
  getComponent (location, callback) {
    import('../../pages/Message').then(module => callback(null, module.default));
  }
}