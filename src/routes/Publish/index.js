export default {
  path: '/publish',
  getComponent (location, callback) {
    import('../../pages/Publish').then(module => callback(null, module.default));
  }
}
