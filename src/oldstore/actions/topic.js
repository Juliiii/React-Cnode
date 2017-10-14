export const REFRESH = 'REFRESH';
export const REFRESH_FAIL = 'REFRESH_FAIL';
export const REFRESH_SUCCESS = 'REFRESH_SUCCESS';

export const GETTOPICS = 'GETTOPICS';
export const GETTOPICS_SUCCESS = 'GETTOPICS_SUCCESS';
export const GETTOPICS_FAIL = 'GETTOPICS_FAIL';

export const CHANGETAB = 'TOPICS/CHANGETAB';

export const PUBLISH = 'PUBLISH';
export const PUBLISH_SUCCESS = 'PUBLISH_SUCCESS';
export const PUBLISH_FAIL = 'PUBLISH_FAIL';

export const GETDETAIL = 'GETDETAIL';
export const GETDETAIL_SUCCESS = 'GETDETAIL_SUCCESS';
export const GETDETAIL_FAIL = 'GETDETAIL_FAIL';

export const COLLECT = 'COLLECT';
export const COLLECT_SUCCESS = 'COLLECT_SUCCESS';
export const COLLECT_FAIL = 'COLLECT_FAIL';

export const DECOLLECT = 'DECOLLECT';
export const DECOLLECT_SUCCESS = 'DECOLLECT_SUCCESS';
export const DECOLLECT_FAIL = 'DECOLLECT_FAIL';

export const UPS = 'UPS';
export const UPS_SUCCESS = 'UPS_SUCCESS';
export const UPS_FAIL = 'UPS_FAIL';

export const COMMENT = 'COMMENT';
export const COMMENT_SUCCESS = 'COMMENT_SUCCESS';
export const COMMENT_FAIL = 'COMMENT_FAIL';

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

export const publish = (payload) => ({
  type: PUBLISH,
  payload
});

export const publishSuccess = () => ({
  type: PUBLISH_SUCCESS
});

export const publishFail = () => ({
  type: PUBLISH_FAIL
});

export const getDetail = (id) => ({
  type: GETDETAIL,
  id
});

export const getDetailSuccess = (detail) => ({
  type: GETDETAIL_SUCCESS,
  detail
});

export const getDetailFail = () => ({
  type: GETDETAIL_FAIL
});

export const collect = (id) => ({
  type: COLLECT,
  id
});

export const collectSuccess = () => ({
  type: COLLECT_SUCCESS
});

export const collectFail = () => ({
  type: COLLECT_FAIL
});

export const decollect = (id) => ({
  type: DECOLLECT,
  id
});

export const decollectSuccess = () => ({
  type: DECOLLECT_SUCCESS
});

export const decollectFail = () => ({
  type: DECOLLECT_FAIL
}); 

export const ups = (reply_id) => ({
  type: UPS,
  reply_id
});

export const upsSuccess = (id, action, reply_id) => ({
  type: UPS_SUCCESS,
  id,
  action,
  reply_id
});

export const upsFail = () => ({
  type: UPS_FAIL
});


export const comment = ({content, reply_id, topic_id}) => ({
  type: COMMENT,
  reply_id,
  content,
  topic_id
});

export const commentSuccess = (detail) => ({
  type: COMMENT_SUCCESS,
  detail
});

export const commentFail = () => ({
  type: COMMENT_FAIL
});