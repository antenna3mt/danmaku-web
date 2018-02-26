import Rpc from '../utils/jsonrpc';


export default {
  namespace: 'admin',

  state: {
    activities: [],
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/admin') {
          dispatch({type: 'fetch'});
        }
      });
    },
  },

  effects: {
    * fetch({payload}, {call, put, select}) {
      try {
        yield put({type: 'loading/on'});
        const token = yield select(state => state.auth.token);
        const {activities} = yield call(Rpc, 'DanmakuService.Activities', {token});
        yield put({type: 'save', payload: {activities}});
      } finally {
        yield put({type: 'loading/off'});
      }
    },
    * new({payload: {name}}, {call, put, select}) {
      try {
        yield put({type: 'loading/on'});
        let token = yield select(state => state.auth.token);
        yield call(Rpc, 'DanmakuService.NewActivity', {name, token});
        yield put({type: 'fetch'});
      } finally {
        yield put({type: 'loading/off'});
      }
    },

    * rename({payload: {id, name}}, {call, put, select}) {
      try {
        yield put({type: 'loading/on'});
        let token = yield select(state => state.auth.token);
        yield call(Rpc, 'DanmakuService.RenameActivity', {token, id, name});
        yield put({type: 'fetch'});
      } finally {
        yield put({type: 'loading/off'});
      }
    },

    * off_review({payload: {id}}, {call, put, select}) {
      try {
        yield put({type: 'loading/on'});
        let token = yield select(state => state.auth.token);
        yield call(Rpc, 'DanmakuService.ReviewOff', {token, id});
        yield put({type: 'fetch'});
      } finally {
        yield put({type: 'loading/off'});
      }
    },

    * on_review({payload: {id}}, {call, put, select}) {
      try {
        yield put({type: 'loading/on'});
        let token = yield select(state => state.auth.token);
        yield call(Rpc, 'DanmakuService.ReviewOn', {token, id});
        yield put({type: 'fetch'});
      } finally {
        yield put({type: 'loading/off'});
      }
    },


    * delete({payload: {id}}, {call, put, select}) {
      try {
        yield put({type: 'loading/on'});
        let token = yield select(state => state.auth.token);
        yield call(Rpc, 'DanmakuService.DelActivity', {token, id});
        yield put({type: 'fetch'});
      } finally {
        yield put({type: 'loading/off'});
      }
    },

    * reset({payload: {id}}, {call, put, select}) {
      try {
        yield put({type: 'loading/on'});
        let token = yield select(state => state.auth.token);
        yield call(Rpc, 'DanmakuService.Reset', {token, id});
        yield put({type: 'fetch'});
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
