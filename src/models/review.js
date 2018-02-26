import Rpc from "../utils/jsonrpc";


function remove_from_array(arr, ele) {
  let re = [];
  for (const e of arr) {
    if (e.id !== ele.id) {
      re = [...re, e]
    }
  }
  return re;
}

export default {
  namespace: 'review',

  state: {
    comments: []
  },

  subscriptions: {},

  effects: {
    * fetch({payload}, {call, put, select}) {
      try {
        yield put({type: 'loading/on'});
        const {token} = yield select(state => state.auth);
        const {comments} = yield call(Rpc, 'DanmakuService.Review', {token});
        yield put({type: 'save', payload: {comments}})
      } finally {
        yield put({type: 'loading/off'});
      }
    },
    * approve({payload: {comment}}, {call, put, select}) {
      try {
        yield put({type: 'loading/on'});

        const {token} = yield select(state => state.auth);
        let {comments} = yield select(state => state.review);
        yield call(Rpc, 'DanmakuService.Approve', {token, ids: [comment.id]});
        yield put({type: 'save', payload: {comments: remove_from_array(comments, comment)}})
      } finally {
        yield put({type: 'loading/off'});
      }
    },
    * deny({payload: {comment}}, {call, put, select}) {
      try {
        yield put({type: 'loading/on'});

        const {token} = yield select(state => state.auth);
        let {comments} = yield select(state => state.review);
        yield call(Rpc, 'DanmakuService.Deny', {token, ids: [comment.id]});
        yield put({type: 'save', payload: {comments: remove_from_array(comments, comment)}})
      } finally {
        yield put({type: 'loading/off'});
      }
    },
    * approve_all({payload}, {call, put, select}) {
      try {
        yield put({type: 'loading/on'});
        const {token} = yield select(state => state.auth);
        let {comments} = yield select(state => state.review);
        let ids = comments.map(comment => comment.id);
        yield call(Rpc, 'DanmakuService.Approve', {token, ids});
        yield put({type: 'save', payload: {comments: []}})
      } finally {
        yield put({type: 'loading/off'});
      }
    },
    * deny_all({payload}, {call, put, select}) {
      try {
        yield put({type: 'loading/on'});
        const {token} = yield select(state => state.auth);
        let {comments} = yield select(state => state.review);
        let ids = comments.map(comment => comment.id);
        yield call(Rpc, 'DanmakuService.Deny', {token, ids});
        yield put({type: 'save', payload: {comments: []}})
      } finally {
        yield put({type: 'loading/off'});
      }
    },
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
  },

};
