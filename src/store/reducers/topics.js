import { topics as actionTypes } from '../actions';

const topicsInitialState = {
  loading: false,
  reachEnd: false,
  refresh: false,
  tab: 'all',
  page: -1,
  data: [],
  all: {
    page: -1,
    data: []
  },
  ask: {
    page: -1,
    data: []
  },
  share: {
    page: -1,
    data: []
  },
  job: {
    page: -1,
    data: []
  },
  dev: {
    page: -1,
    data: []
  },
  good: {
    page: -1,
    data: []
  }
};
const topics = (state = topicsInitialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGETAB:
      return {
        ...state,
        tab: action.tab,
        loading: false,
        reachEnd: false,
        refresh: false,
        data: [...state[action.tab].data],
        page: state[action.tab].page
      };
    case actionTypes.GETTOPICS_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.REFRESH_FAIL:
      return {
        ...state,
        refresh: false
      };
    case actionTypes.REFRESH_SUCCESS:
      return {
        ...state,
        loading: false,
        reachEnd: false,        
        refresh: false,
        page: 0,
        data: [...action.data],
        [state.tab]: { page: 0, data: action.data }
      };
    case actionTypes.GETTOPICS_SUCCESS:
      return {
        ...state,
        loading: false,
        reachEnd: action.data.length === 0,        
        data: [...state.data , ...action.data],
        page: state[state.tab].page + 1,
        [state.tab]: { page: state[state.tab].page + 1, data: [...state[state.tab].data, ...action.data] }       
      };
    case actionTypes.SETLOADING: 
      return {
        ...state,
        loading: true
      };
    case actionTypes.SETREFRESH:
      return {
        ...state,
        refresh: true
      };
    default: return state;
  }
}

export default topics;
