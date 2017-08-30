export const REFRESH = 'REFRESH';
export const REFRESH_FAIL = 'REFRESH_FAIL';
export const REFRESH_SUCCESS = 'REFRESH_SUCCESS';

export const GETTOPICS = 'GETTOPICS';
export const GETTOPICS_SUCCESS = 'GETTOPICS_SUCCESS';
export const GETTOPICS_FAIL = 'GETTOPICS_FAIL';

export const CHANGETAB = 'CHANGETAB';

export const SETLOADING = 'SETLOADING';
export const SETREFRESH = 'SETREFRESH';


export const refresh = () => ({
  type: REFRESH
});

export const refreshSuccess = (data) =>({
  type: REFRESH_SUCCESS,
  data
});

export const refreshFail = () => ({
  type: REFRESH_FAIL
});


export const getTopics = () => ({
  type: GETTOPICS
});

export const getTopicsSuccess = (data) =>({
  type: GETTOPICS_SUCCESS,
  data
});

export const getTopicsFail = () => ({
  type: GETTOPICS_FAIL
});

export const changeTab = (tab) => ({
  type: CHANGETAB,
  tab
});

export const setLoading = () => ({
  type: SETLOADING
});


export const setRefresh = () => ({
  type: SETREFRESH
});
