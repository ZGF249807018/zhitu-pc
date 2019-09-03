import { login, logout, getInfo, register, backPassword } from '@/api/login'
import { getToken, setToken, removeToken, getUserInfo, setRole } from '@/utils/auth'
import { Message } from 'element-ui'
import store from '../index'

const user = {
  state: {
    token: getToken(),
    tid: '',
    uid: '',
    primary: '',
    account: '',
    logo: '',
    certify: '',
    company: '',
    register: '',
    coupon: '',
    balance: '',
    savePassword: false
  },

  mutations: {
    SET_COUPON: (state, coupon) => {
      state.coupon = coupon
    },
    SET_BALANCE: (state, balance) => {
      state.balance = balance
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_TID: (state, tid) => {
      state.tid = tid
    },
    SET_UID: (state, uid) => {
      state.uid = uid
    },
    SET_PRIMARY: (state, primary) => {
      state.primary = primary
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account
    },
    SET_LOGO: (state, logo) => {
      state.logo = logo
    },
    SET_COMPANY: (state, company) => {
      state.company = company
    },
    SET_REGISTER: (state, register) => {
      state.register = register
    },
    SET_CERTIFY: (state, certify) => {
      state.certify = certify
    },
    SET_SAVEPASSWORD: (state, savePassword) => {
      state.savePassword = savePassword
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const period = new Date().getTime()
      const expiresTime = new Date(period + 60 * 1000 * 720) // 默认有效期720分钟，12小时
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          if (!store.getters.savePassword) {
            setToken(response.access_token, expiresTime)
          } else {
            setToken(response.access_token, 7) // cookie有效期 7 天
          }
          commit('SET_TOKEN', response.access_token)
          resolve()
        }).catch(error => {
          // Message.error(error.message)
          reject(error)
        })
      })
    },
    // 注册
    Register({ commit }, register) {
      return new Promise((resolve, reject) => {
        register(register.phone, register.captcha, register.username, register.password, register.company, register.name).then(response => {
          commit('SET_REGISTER', response.success)
          resolve()
        }).catch(error => {
          Message.error(error.message)
          reject(error)
        })
      })
    },
    // 找回密码
    BackPassword(mobile, smsCode, password) {
      return new Promise((resolve, reject) => {
        backPassword(mobile, smsCode, password).then(response => {
          Message.success('密码重置成功，请到首页登录')
          resolve()
        }).catch(error => {
          Message.error(error.message)
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const e = response.data
          if (e) {
            commit('SET_TID', e.tenantId)
            commit('SET_UID', e.userId)
            commit('SET_CERTIFY', response.data.certifyStatus)
            commit('SET_PRIMARY', e.isPrimary)
            setRole(e.isPrimary)
            commit('SET_ACCOUNT', e.account)
            commit('SET_LOGO', e.logo)
            commit('SET_COMPANY', e.company)
          } else {
            reject('error')
          }
          resolve(response)
        }).catch(error => {
          Message.error(error.message)
          // commit('SET_TOKEN', '')
          // commit('SET_TID', '')
          // removeToken()
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_TID', '')
          removeToken()
          resolve()
        }).catch(error => {
          Message.error(error.message)
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
