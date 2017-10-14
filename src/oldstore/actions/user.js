export const GETUSERINFO = 'GETUSERINFO';
export const GETUSERINFO_SUCCESS = 'GETUSERINFO_SUCCESS';
export const GETUSERINFO_FAIL = 'GETUSERINFO_FAIL';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const LOGOUT = 'LOGOUT';

export const GETMESSAGECOUNT = 'GETMESSAGECOUNT';
export const GETMESSAGECOUNT_SUCCESS = 'GETMESSAGECOUNT_SUCCESS';
export const GETMESSAGECOUNT_FAIL = 'GETMESSAGECOUNT_FAIL';

export const GETMESSAGES = 'GETMESSAGES';
export const GETMESSAGES_SUCCESS = 'GETMESSAGES_SUCCESS';
export const GETMESSAGES_FAIL = 'GETMESSAGES_FAIL';

export const GETCOLLECTIONS = 'GETCOLLECTIONS';
export const GETCOLLECTIONS_SUCCESS = 'GETCOLLECTIONS_SUCCESS';
export const GETCOLLECTIONS_FAIL = 'GETCOLLECTIONS_FAIL';

export const MARKALL = 'MARKALL';
export const MARKALL_SUCCESS = 'MARKALL_SUCCESS';
export const MARKALL_FAIL = 'MARKALL_FAIL';

export const getuserInfo = (loginname) => ({
  type: GETUSERINFO,
  loginname
});

export const getuserInfoSuccess = (info) => ({
  type: GETUSERINFO_SUCCESS,
  info
});

export const getUserInfoFail = () => ({
  type: GETUSERINFO_FAIL
});

export const login = (accesstoken) => ({
  type: LOGIN,
  accesstoken
});

export const loginSuccess = (accesstoken, loginname, id) => ({
  type: LOGIN_SUCCESS,
  loginname,
  accesstoken,
  id
});

export const loginFail = () => ({
  type: LOGIN_FAIL
});


export const logout = () => ({
  type: LOGOUT
});

export const getMessageCount = () => ({
  type: GETMESSAGECOUNT
});

export const getMessageCountSuccess = (messageCount) => ({
  type: GETMESSAGECOUNT_SUCCESS,
  messageCount
});

export const getMessageCountFail = () => ({
  type: GETMESSAGECOUNT_FAIL
});


export const getMessages = () => ({
  type: GETMESSAGES
});

export const getMessagesSuccess = (messages) => ({
  type: GETMESSAGES_SUCCESS,
  messages
});

export const getMessagesFail = () => ({
  type: GETMESSAGES_FAIL
});

export const getCollections = () => ({
  type: GETCOLLECTIONS
});

export const getCollectionsSuccess = (collections) => ({
  type: GETCOLLECTIONS_SUCCESS,
  collections
});

export const getCollectionsFail = () => ({
  type: GETCOLLECTIONS_FAIL
});

export const markAll = () => ({
  type: MARKALL
});

export const markAllSuccess = () => ({
  type: MARKALL_SUCCESS
});

export const markAllFail = () => ({
  type: MARKALL_FAIL
});

