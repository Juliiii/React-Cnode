import * as actionTypes from '../actions/status';

const reducer = (state = { loading: false, submitting: false, reachEnd: false, refresh: false }, action) => {
  switch (action.type) {
    case actionTypes.SETLOADING:
    case actionTypes.SETSUBMITTING:
    case actionTypes.SETREFRESH:
      return {
        ...state,
        [action.key]: !state[action.key]
      };
    case actionTypes.SETREACHEND:
      return {
        ...state,
        reachEnd: action.value
      };
    default: return state;
  }
};


export default reducer;