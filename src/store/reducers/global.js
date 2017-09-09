import { global as actionTypes } from '../actions';
import { LOCATION_CHANGE } from 'react-router-redux';
const globalInitialState = {
  tab: 'home',
  error: false
}
const global = (state = globalInitialState, action) => {
  switch (action.type) {
    case actionTypes.SETTAB:
      return {
        ...state,
        tab: action.tab
      };
    case LOCATION_CHANGE:
      console.log(action);
      return state;
    default:
      return state;
  }
}
export default global;