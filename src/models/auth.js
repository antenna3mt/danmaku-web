import {routerRedux} from 'dva/router';
import Rpc from '../utils/jsonrpc';

export default {
  namespace: 'auth',

  state: {
    token: '',
    type: '',
    logged_in: false
  },

  subscriptions: {},

  effects: {
    * login({payload}, {call, put, select}) {
      try {
        yield put({type: 'loading/on'});
        const {token} = yield select(state => state.auth);
        const {type} = yield call(Rpc, 'DanmakuService.Login', {token});
        yield put({type: 'save', payload: {token, type, logged_in: true}});
        yield put(routerRedux.push('/' + type));
      } finally {
        yield put({type: 'loading/off'});
      }
    },
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
    change(state, {payload: {token}}) {
      return {...state, token}
    }
  },

};
