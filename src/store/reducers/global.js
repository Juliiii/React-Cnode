import { global as actionTypes } from '../actions';

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
    default:
      return state
  }
}
export default global;