// import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import qs from 'qs'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API,
  transformRequest: [function(data) {
    data = qs.stringify(data)
    return data
  }],
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  timeout: 10000
})
console.log(process.env.BASE_API)
// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['authorization'] = `bearer ${getToken()}`// 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.success === false) {
      Message.error(res.msg || '请求失败，请稍后再试')
      return Promise.reject('error')
    } else {
      return response.data
    }
    const err = new Error(res.description)
    err.data = res
    err.response = response
    throw err
  },
  error => {
    console.log('错误信息：' + error)
    if (/Network Error/i.test(error)) {
      Message.error('你当前无法上网，请检查你的网络是否连接')
    }
    if (/ms exceeded/i.test(error)) {
      Message.error('你的网络连接不稳定，请检查你的网络是否连接')
    }
    if (/code 500/i.test(error)) {
      Message.error('服务器内部错误')
    }
    if (/code 400/i.test(error)) {
      Message.error('账号或密码错误')
    }
    return Promise.reject(error)
  }
)

export default service
