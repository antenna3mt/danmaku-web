export default {
  namespace: 'loading',

  state: {
    loading: false,
  },

  subscriptions: {},

  effects: {},

  reducers: {
    on(state, action) {
      return {...state, loading: true};
    },
    off(state, action) {
      return {...state, loading: false};
    },
  },

};
