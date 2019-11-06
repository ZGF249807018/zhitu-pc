import router, { constantRouterMap } from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login', '/register', '/backpwd', '/resume', '/agreement', '/reportDetails', '/wrote', '/jobInfo', '/authorize', '/home', '/credit', '/product', '/about', '/develop'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.tid === '') {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          let newrouter
          if (store.getters.primary === 1) {
            newrouter = constantRouterMap
          } else {
            constantRouterMap.splice(18, 1)
            newrouter = constantRouterMap
          }
          router.addRoutes(newrouter)
          next()
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err.msg || '请求失败，请稍后再试')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 登录白名单
      next()
    } else {
      next('/home')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
