const topicsInitialState = {
  loading: false,
  reachEnd: false,
  tab: 'all',
  all: {
    page: 0,
    datas: []
  },
  ask: {
    page: 0,
    datas: []
  },
  share: {
    page: 0,
    datas: []
  },
  job: {
    page: 0,
    datas: []
  },
  dev: {
    page: 0,
    datas: []
  },
  good: {
    page: 0,
    datas: []
  }
};
const topics = (state = topicsInitialState, action) => {
  switch (action.type) {
    case ACTION_TYPE_1:
      return state
    case ACTION_TYPE_2:
      return state
    default:
      return state
  }
}
