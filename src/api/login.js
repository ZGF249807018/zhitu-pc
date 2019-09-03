import { api } from '@/utils/api'
import request from '@/utils/request'
export function login(username, password) { return request({ url: '/oauth2/oauth/token?grant_type=password', headers: { 'Authorization': 'Basic ' + btoa('xwf' + ':' + 'givemefive') }, method: 'post', data: { username, password }}) }

// 获取用户信息
export function getInfo() { return request({ url: api.tenant + '/v1/user/info', method: 'get' }) }

// 注册
export function register(mobile, account, password, company, inviteCode) { return request({ url: api.tenant + '/v1/visit/register', method: 'post', data: { mobile, account, password, company, inviteCode }}) }

// 找回密码
export function backPassword(mobile, smsCode, password) { return request({ url: api.tenant + '/v1/visit/retrievePwd', method: 'post', data: { mobile, smsCode, password }}) }

// 退出登录
export function logout() { return request({ url: api.tenant + '/user/logout', method: 'post' }) }

// 图像验证码
export const img_code = process.env.BASE_API + api.tenant + '/v1/visit/imageCode'

// 注册发送图片验证码
export function sendImgCode(mobile, imageCode, bizType) { return request({ url: api.tenant + '/v1/visit/sendImgCode', method: 'post', data: { mobile, imageCode, bizType }}) }

// 注册第一步
export function registStepOne(mobile, smsCode) { return request({ url: api.tenant + '/v1/visit/registStepOne', method: 'post', data: { mobile, smsCode }}) }

// 忘记密码 发送图片验证码短信
export function sendSmsCodeWithImageCode(mobile, imageCode) { return request({ url: api.tenant + '/v1/retrievePassword/login/sendSmsCodeWithImageCode', method: 'post', data: { mobile, imageCode }}) }

// 设置登陆密码点击下一步
export function findLoginPwd(mobile, smsCode) { return request({ url: api.tenant + '/v1/retrievePassword/login/findLoginPwd', method: 'post', data: { mobile, smsCode }}) }

// 设置登陆密码
export function setLoginPwd(mobile, encryptKey, loginPassword) { return request({ url: api.tenant + '/v1/retrievePassword/login/setLoginPwd', method: 'post', data: { mobile, encryptKey, loginPassword }}) }

// 注册验证邮箱 获取验证码
export function sendEmail(email) { return request({ url: api.tenant + '/v1/visit/sendEmail', method: 'post', data: { email }}) }

