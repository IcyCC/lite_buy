import { checkPassword } from '@/api'

const state = {
  isLock: true
}

const mutations = {
  SET_ISLOCK: (state, isLock) => {
    state.isLock = isLock
  }
}

const actions = {
  unlock({ commit }, password) {
    return new Promise((resolve, reject) => {
      checkPassword(password).then(() => {
        commit('SET_ISLOCK', false)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
