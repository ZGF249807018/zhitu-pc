import Vue from 'vue'
// import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import moment from 'moment/moment'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'
import BaiduMap from 'vue-baidu-map'
import '@/icons' // icon
import '@/permission' // permission control
// import $ from 'jquery'
// Vue.use(ElementUI, { locale })
Vue.filter('moment', function(value, formatString) {
  formatString = formatString || 'YYYY-MM-DD'
  if (!value) {
    return ''
  }
  return moment(value).format(formatString) // value可以是普通日期 20170723
  // return moment.unix(value).format(formatString) // 时间戳转时间
})

Vue.filter('moment2', function(value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
  if (!value) {
    return ''
  }
  return moment(value).format(formatString) // value可以是普通日期 20170723
  // return moment.unix(value).format(formatString) // 时间戳转时间
})
Vue.filter('politicalStatus', function(value) {
  if (value == 1) {
    return '团员 '
  } else if (value == 2) {
    return '党员'
  } else {
    return '群众'
  }
})
Vue.filter('currentState', function(value) {
  if (value == 1) {
    return '应届毕业生'
  } else if (value == 2) {
    return '已离职'
  } else if (value == 3) {
    return '在职'
  } else {
    return '其他'
  }
})
Vue.filter('workingNum', function(value) {
  if (value == 1) {
    return '1-3年'
  } else if (value == 2) {
    return '3-5年'
  } else if (value == 3) {
    return '5-10年'
  } else if (value == 4) {
    return '10年以上'
  } else {
    return ''
  }
})
Vue.filter('certifyStatus', function(value) {
  if (value == 0) {
    return '未认证'
  } else if (value == 1) {
    return '审核中'
  } else if (value == 2) {
    return '认证失败'
  } else if (value == 3) {
    return '已认证'
  }
})
Vue.filter('decimalNum', function(value) {
  value = Number(value) / 100
  return value.toFixed(0)
})
Vue.filter('decimalNum2', function(value) {
  value = Number(value) / 100
  return value.toFixed(2)
})
Vue.use(BaiduMap, {
  /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
  ak: 'SyeuR6eFipsOOhRIombtW1GVGVZGc8Gt'
})
const debugTools = process.env.NODE_ENV !== 'production'
Vue.config.debug = debugTools
Vue.config.devtools = debugTools
Vue.config.productionTip = debugTools

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
