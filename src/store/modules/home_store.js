const state = {
  count: 1000
}
const mutations = {
  inc(state) {
    state.count++
  },
  dec(state, n) {
    state.count += 20
  }
}

const actions = {}
export default {
  namespace: true,
  state,
  mutations,
  actions
}