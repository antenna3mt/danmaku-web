import {routerRedux} from 'dva/router';
import Rpc from '../utils/jsonrpc';

export default {
  namespace: 'auth',

  state: {
    token: '',
    type: '',
    logged_in: false,
    title: ''
  },

  subscriptions: {},

  effects: {
    * login({payload}, {call, put, select}) {
      try {
        yield put({type: 'loading/on'});
        const {token} = yield select(state => state.auth);
        const {type} = yield call(Rpc, 'DanmakuService.Login', {token});
        yield put({type: 'save', payload: {token, type, logged_in: true}});

        if (type === 'comment' || type === 'review') {
          yield put({type: 'get_activity'})
        }
        yield put(routerRedux.push('/' + type));
      } finally {
        yield put({type: 'loading/off'});
      }
    },

    * get_activity({payload}, {call, put, select}) {
      try {
        yield put({type: 'loading/on'});
        const {token} = yield select(state => state.auth);
        const {activity: {name}} = yield call(Rpc, 'DanmakuService.GetActivityDigest', {token});
        yield put({type: 'save', payload: {title: name}});
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
