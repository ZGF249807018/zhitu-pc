import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import code from './modules/captcha'
import order from './modules/order'
import person from './modules/person'
import resume from './modules/resume'
import user from './modules/user'
import assets from './modules/assets'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    code,
    assets,
    person,
    order,
    resume
  },
  getters
})

export default store
