import { user as actionTypes } from '../actions';
const accesstoken = window.localStorage.getItem('accesstoken');
const loginname = window.localStorage.getItem('loginname');
let initState = {
  accesstoken,
  loginname,
  submitting: false,
  info: {},
}
const user = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLESUBMITTING:
      return {
        ...state,
        submitting: true
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        accesstoken: action.accesstoken,
        loginname: action.loginname,
        submitting: false
      };
    case actionTypes.LOGOUT: 
      window.localStorage.removeItem('accesstoken');
      window.localStorage.removeItem('loginname');
      return {
        ...state,
        accesstoken: undefined,
        loginname: undefined
      };
    case actionTypes.GETUSERINFO_SUCCESS:
      return {
        ...state,
        info: {...action.info},
        submitting: false
      };
    case actionTypes.GETUSERINFO:
    case actionTypes.LOGIN: return state;
    case actionTypes.GETUSERINFO_FAIL:
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        submitting: false
      };
    default: return state;
  }
};

export default user;