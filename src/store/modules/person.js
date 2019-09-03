import { userDetail } from '@/api/info'
import Cookies from 'js-cookie'
const person = {
  state: {
    email: '',
    mobile: '',
    name: '',
    contact: '',
    paypass: '',
    certify: ''
  },

  mutations: {
    SET_COMPANY: (state, company) => {
      state.company = company
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_MOBILE: (state, mobile) => {
      state.mobile = mobile
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_CONTACT: (state, contact) => {
      state.contact = contact
    },
    SET_PAYPASS: (state, paypass) => {
      state.paypass = paypass
    }
  },

  actions: {
    GetUserDetail({ commit }, tenantId) {
      return new Promise((resolve, reject) => {
        userDetail(tenantId).then((response) => {
          Cookies.set('mobile', response.data.mobile)
          Cookies.set('email', response.data.email)
          commit('SET_COMPANY', response.data.company)
          commit('SET_EMAIL', response.data.email)
          commit('SET_MOBILE', response.data.mobile)
          commit('SET_NAME', response.data.name)
          commit('SET_CONTACT', response.data.contactName)
          commit('SET_PAYPASS', response.data.isSetPayPwd)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default person
