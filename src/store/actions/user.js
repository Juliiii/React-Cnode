export const GETUSERINFO = 'GETUSERINFO';

export const GETUSERINFO_SUCCESS = 'GETUSERINFO_SUCCESS';

export const GETUSERINFO_FAIL = 'GETUSERINFO_FAIL';

export const LOGIN = 'LOGIN';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const LOGIN_FAIL = 'LOGIN_FAIL';

export const LOGOUT = 'LOGOUT';

export const TOGGLESUBMITTING = 'TOGGLESUBMITTING';

export const SETLOADING = 'SETUSERLOADING';


export const getuserInfo = () => ({
  type: GETUSERINFO
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

export const loginSuccess = (accesstoken, loginname) => ({
  type: LOGIN_SUCCESS,
  loginname,
  accesstoken
});

export const loginFail  = () => ({
  type: LOGIN_FAIL
});


export const logout = () => ({
  type: LOGOUT
});

export const toggle = () => ({
  type: TOGGLESUBMITTING
});

export const setLoading = () => ({
  type: SETLOADING
});
