import { recharge } from '@/api/info'
const assets = {
  state: {
    payload: '',
    payTypes: ''
  },

  mutations: {
    SET_PAY: (state, payload) => {
      state.payload = payload
    },
    SET_PAYTYPE: (state, payTypes) => {
      state.payTypes = payTypes
    }
  },

  actions: {
    payforn({ commit }, rechargeForm) {
      return new Promise((resolve, reject) => {
        recharge(rechargeForm.userId, rechargeForm.amount, rechargeForm.payType).then((response) => {
          commit('SET_PAY', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default assets
