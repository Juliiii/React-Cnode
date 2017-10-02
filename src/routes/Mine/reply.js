export default {
  path: 'reply',
  getComponent (location, callback) {
    import('../../pages/Mine/Reply').then(module => callback(null, module.default));
  }
}
