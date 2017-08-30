import { user as actionTypes } from '../actions';
const accesstoken = window.localStorage.getItem('accesstoken');
let initState = {
  accesstoken,
  loginname: undefined,
  info: {},
}
const user = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        accesstoken: action.accesstoken,
        loginname: action.loginname,
      };
    case actionTypes.LOGOUT: 
      return {
        ...state,
        accesstoken: undefined
      };
    case actionTypes.GETUSERINFO_SUCCESS:
      return {
        ...state,
        info: {...action.info}
      };
    case actionTypes.GETUSERINFO_FAIL: return state;
    case actionTypes.GETUSERINFO: return state;
    case actionTypes.LOGIN: return state
    case actionTypes.LOGIN_FAIL: return state;
    default: return state;
  }
};

export default user;