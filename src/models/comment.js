import Rpc from '../utils/jsonrpc';

export default {
  namespace: 'comment',

  state: {
    text: '',
    color: '#ffffff',
  },

  subscriptions: {},

  effects: {
    * push({payload}, {call, put, select}) {
      try {
        yield put({type: 'loading/on'});
        let {text, color} = yield select(state => state.comment);
        text = text.trim();
        if (text.length > 0) {
          let {token} = yield select(state => state.auth);
          yield call(Rpc, 'DanmakuService.Push', {token, type: 'text', attr: {text, color}});
          yield put({type: 'save', payload: {text: ''}})
          return true
        } else {
          return false
        }
      } finally {
        yield put({type: 'loading/off'});
      }
    },
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    }
  },

};
