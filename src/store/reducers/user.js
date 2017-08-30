import { user as actionTypes } from '../actions';
const accesstoken = window.localStorage.getItem('accesstoken');
let initState = {
  accesstoken,
  info: {}
}
const user = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN: return state
    case actionTypes.LOGIN_SUCCESS: console.log(action); return state;
    case actionTypes.LOGIN_FAIL: return state;
    default: return state;
  }
};

export default user;