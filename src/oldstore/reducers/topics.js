import { topics as actionTypes } from '../actions';

let tab = localStorage.getItem('tab');
let data = localStorage.getItem('data');
let page = localStorage.getItem('page');

const topicsInitialState = {
  tab: tab ? JSON.parse(tab) : 'all',
  page: page ? JSON.parse(page) : -1,
  data: data ? JSON.parse(data) : [],
  limit: 20,
  detail: {}
};
const topics = (state = topicsInitialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGETAB:
      return {
        ...state,
        data: [],
        page: -1,
        tab: action.tab
      };
    case actionTypes.COLLECT_SUCCESS:
    case actionTypes.DECOLLECT_SUCCESS:
      return {
        ...state,
        detail: {
          ...state.detail,
          is_collect: !state.detail.is_collect
        }
      };
    case actionTypes.REFRESH_SUCCESS:
      return {
        ...state,
        page: -1,
        data: action.data
      };
    case actionTypes.GETDETAIL_SUCCESS:
      return {
        ...state,
        detail: action.detail
      };
    case actionTypes.GETTOPICS_SUCCESS:
      return {
        ...state,
        data: action.data,
        page: state.page + 1
      };
    case actionTypes.UPS_SUCCESS:
      return {
        ...state,
        detail: {
          ...state.detail,
          replies: editUps({...action, replies: state.detail.replies})
        }
      };
    case actionTypes.COMMENT_SUCCESS:
      return {
        ...state,
        detail: {...action.detail}
      };
    default: return state;
  }
}

function editUps ({reply_id, action, replies, id}) {
  return replies.map(reply => {
    if (reply.id === reply_id) {
      return {
        ...reply,
        ups: action === 'down' ? [...removeFromUps(reply_id, reply.ups)] : [...reply.ups, reply_id],
        is_uped: action !== 'down'
      };
    } else {
      return reply;
    }
  });
}

function removeFromUps (reply_id, ups) {
  return ups.filter(item => item !== reply_id);
}

export default topics;
