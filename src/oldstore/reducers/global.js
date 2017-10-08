import { global as actionTypes } from '../actions';
import { LOCATION_CHANGE } from 'react-router-redux';

const globalInitialState = {
  tab: 'home',
  error: false,
  from: '',
  to: '',
  change: false
}
const global = (state = globalInitialState, action) => {
  switch (action.type) {
    case actionTypes.SETTAB:
      return {
        ...state,
        tab: action.tab
      };
    case LOCATION_CHANGE:
      if (state.from === '') {
        return {
          ...state,
          from: action.payload.pathname,
          to: action.payload.pathname,
          change: true
        };
      }
      return {
        ...state,
        from: state.to,
        to: action.payload.pathname,
        change: action.payload.pathname !== state.to
      };
    case actionTypes.SETROUTERCHANGE:
      return {
        ...state,
        change: action.change
      };
    default:
      return state;
  }
}
export default global;