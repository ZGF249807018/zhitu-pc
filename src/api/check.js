import { api } from '@/utils/api'
import request from '@/utils/request'

// 验证用户手机号是否存在 注册或者添加子账号
export function checkPhone(mobile) { return request({ url: api.tenant + '/v1/visit/mobileIsExisted', method: 'get', params: { mobile }}) }

// 验证公司是否已存在 注册用
export function checkCompany(company) { return request({ url: api.tenant + '/v1/visit/companyIsExisted', method: 'get', params: { company }}) }

// 通过手机号发送短信验证码 用于找回密码，注册
export function sendCaptcha(mobile, bizType) { return request({ url: api.tenant + '/v1/visit/sendCode', method: 'post', data: { mobile, bizType }}) }

// 候选人授权填写资料发送短信验证
export function authCaptcha(mobile, bizType, smsCode) { return request({ url: api.tenant + '/v1/visit/smsCode/check ', method: 'post', data: { mobile, bizType, smsCode }}) }

// 通过手机号发送短信验证码 用于绑定手机号
export function bindPhomeCode(mobile, bizType, tenantId, userId) { return request({ url: api.tenant + '/v1/sms/sendCode', method: 'post', data: { mobile, bizType, tenantId, userId }}) }

// 验证帐户名是否存在 注册或者添加子账号
export function checkUsername(account) { return request({ url: api.tenant + '/v1/visit/accountIsExisted', method: 'get', params: { account }}) }

// 验证账户名是否存在 子账号管理
export function checkEditAccount(account, userId) { return request({ url: api.tenant + '/v1/user/accountIsExisted', method: 'get', params: { account, userId }}) }

// 验证用户手机号是否存在 子账号管理
export function checkEditPhone(mobile, userId) { return request({ url: api.tenant + '/v1/user/mobileIsExisted', method: 'get', params: { mobile, userId }}) }

// 个人中心-修改手机号-验证手机验证码
export function validateCode(mobile, smsCode, bizType) { return request({ url: api.tenant + '/v1/tenant/validateCode', method: 'post', data: { mobile, smsCode, bizType }}) }

// 注册验证邮箱是否存在
export function emailIsExisted(email) { return request({ url: api.tenant + '/v1/visit/emailIsExisted', method: 'get', params: { email }}) }

// 根据身份证号解析籍贯，生日，性别信息
export function threeElements(idCard) { return request({ url: api.orderApi + '/v1/candidate/threeElements', method: 'get', params: { idCard }}) }

