import { user as actionTypes } from '../actions';
const accesstoken = window.localStorage.getItem('accesstoken');
const loginname = window.localStorage.getItem('loginname');
const id = window.localStorage.getItem('id');
let initState = {
  accesstoken,
  loginname,
  id,
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
        id: action.id
      };
    case actionTypes.LOGOUT: 
      return {
        ...state,
        accesstoken: undefined,
        loginname: undefined,
        id: undefined
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