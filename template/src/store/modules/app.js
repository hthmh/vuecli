const store = {
  namespaced: true,
  state: {
    appState: true,
  },
  mutations: {
    updateAppState(state, data) {
      state.appState = data
    }
  },
  actions: {
    updateAppState(contex, data) {
      contex.commit('updateAppState', !contex.state.appState)
    }
  }
}

export default store
