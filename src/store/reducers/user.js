import { user as actionTypes } from '../actions';
const accesstoken = window.localStorage.getItem('accesstoken');
const loginname = window.localStorage.getItem('loginname');
let initState = {
  accesstoken,
  loginname,
  info: {},
  messageCount: 0,
  messages: [],
  collections: []
};
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
        accesstoken: undefined,
        loginname: undefined
      };
    case actionTypes.GETUSERINFO_SUCCESS:
      return {
        ...state,
        info: {...action.info},
      };
    case actionTypes.GETCOLLECTIONS_SUCCESS:
      return {
        ...state,
        collections: action.collections
      };
    case actionTypes.GETMESSAGECOUNT_SUCCESS:
      return {
        ...state,
        messageCount: action.messageCount
      };
    case actionTypes.GETMESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.messages
      };
    default: return state;
  }
};

export default user;