import { createStore } from 'vuex'

export default createStore({
  state: {
    auth: {
      isAuthenticated: false,
      token: ''
    }
  },
  getters: {
    isAuthenticated: state => state.auth.isAuthenticated,
    token: state => state
  },
  mutations: {
    authenticate(state, token) {
      state.auth.isAuthenticated = token !== ''
      state.auth.token = token
    }
  },
  actions: {
    authenticate({ commit }, token) {
      commit('authenticate', token)
    }
  },
  modules: {
  }
})
