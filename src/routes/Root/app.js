import IndexRoutes from './index'

export default {
  path: '',
  getComponent (location, callback) {
    import('../../pages/Main/app').then(module => {
      callback(null, module.default)
    });
  },
  childRoutes: IndexRoutes
}
