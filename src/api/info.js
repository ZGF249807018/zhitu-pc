import { api } from '@/utils/api'
import request from '@/utils/request'
// 个人中心-更新企业图标
export function updateLogo(logo, id) { return request({ url: api.tenant + '/v1/tenant/updateLogo', method: 'post', data: { logo, id }}) }

// 上传图片
export const addLogo = process.env.BASE_API + api.package + '/file/upload'

// 上传execl
export const addExecl = process.env.BASE_API + api.package + '/candidate/batchUpload'

// 上传签名图片
export function updateName(file) { return request({ url: api.package + '/file/upload', method: 'post', data: { file }}) }
// 设置支付密码
export function setPassword(tenantId, mobile, payPassword, smsCode) { return request({ url: api.tenant + '/v1/payPassword/set', method: 'post', data: { tenantId, mobile, payPassword, smsCode }}) }

// 个人中心-修改手机号-绑定手机号
export function bindMobile(mobile, smsCode, bizType, userId) { return request({ url: api.tenant + '/v1/tenant/bindMobile', method: 'post', data: { mobile, smsCode, bizType, userId }}) }

// 人中心-修改手机号-验证手机验证码
export function validateCode(mobile, smsCode, bizType) { return request({ url: api.tenant + '/v1/sms/validateCode', method: 'post', data: { mobile, smsCode, bizType }}) }

// 人中心-修改手机号-修改邮箱
export function bindemail(userId, email, emailCode) { return request({ url: api.tenant + '/v1/tenant/bindEmail', method: 'post', data: { userId, email, emailCode }}) }

// 个人中心-未绑定发送邮箱验证码
export function sendEmail2(email) { return request({ url: api.tenant + '/v1/tenant/sendEmail2', method: 'post', data: { email }}) }

// // 个人中心-发送邮箱验证码
export function sendEmailCode(userId) { return request({ url: api.tenant + '/v1/tenant/sendEmail', method: 'post', data: { userId }}) }

// 个人中心-绑定邮箱验证码
export function send_email(email) { return request({ url: api.tenant + '/v1/tenant/v1/send_email', method: 'post', data: { email }}) }

// 个人中心-修改密码
export function modifyPassword(tenantId, userId, oldPassword, newPassword) { return request({ url: api.tenant + '/v1/user/modifyPassword', method: 'post', data: { tenantId, userId, oldPassword, newPassword }}) }

// 个人中心-基本信息
export function userDetail(tenantId) { return request({ url: api.tenant + '/v1/tenant/detail', method: 'get', params: { tenantId }}) }

// 获取面试资料填写地址（前端去生成二维码）
export function getInterviewUrl(tenantId, userId) { return request({ url: api.tenant + '/v1/user/getInterviewUrl', method: 'get', params: { tenantId, userId }}) }

// 发送面试资料
export function sendInterviewUrl(userId, tenantId, mobile, name) { return request({ url: api.tenant + '/v1/sms/sendInterviewUrl', method: 'post', data: { userId, tenantId, mobile, name }}) }

// 获取租户余额
export function getBalance(tenantId) { return request({ url: api.orderApi + '/v1/balance/getBalance', method: 'get', params: { tenantId }}) }

// 个人中心-提交企业实名认证
export function certificate(info) { return request({ url: api.tenant + '/v1/tenant/certificate', method: 'post', data: info }) }

// 个人中心-子账号列表
export function findAll(tenantId) { return request({ url: api.tenant + '/v1/user/findAll', method: 'get', params: { tenantId }}) }

// 个人中心-重置子账号密码
export function resetPwd(id, tenantId, restPwd) { return request({ url: api.tenant + '/v1/user/resetPwd', method: 'post', data: { id, tenantId, restPwd }}) }

// 个人中心-添加子账号
export function addAccount(name, email, mobile, account, password, tenantId) { return request({ url: api.tenant + '/v1/user/add', method: 'post', data: { name, email, mobile, account, password, tenantId }}) }

// 个人中心-编辑子账号
export function editAccount(id, account, email, name, mobile) { return request({ url: api.tenant + '/v1/user/update', method: 'post', data: { id, account, email, name, mobile }}) }

// 个人中心-删除子账号
export function deleteAccount(ids, tenantId) { return request({ url: api.tenant + '/v1/user/delete', method: 'post', data: { ids, tenantId }}) }

// 资产管理 充值
export function recharge(userId, amount, payType) { return request({ url: api.orderApi + '/v1/billing/recharge', method: 'post', data: { userId, amount, payType }}) }

// 资资产管理-消费记录
export function rechargeRecord(pageSize, pageNum, tenantId, startTime, endTime, type) { return request({ url: api.orderApi + '/v1/billing/list', method: 'post', data: { pageSize, pageNum, tenantId, startTime, endTime, type }}) }

// 通过订单号生成url
export function wxqrcode(tradeNo) { return request({ url: api.orderApi + '/v1/billing/get_wxqrcode', method: 'post', data: { tradeNo }}) }

// 首页获取有效的优惠券数量
export function couponRecord(tenantId) { return request({ url: api.orderApi + '/v1/couponRecord/count', method: 'get', params: { tenantId }}) }

// 获取可用职兔币的数量
export function countNum(tenantId) { return request({ url: api.orderApi + '/v1/coin/count', method: 'get', params: { tenantId }}) }

// 获取可用职兔币的数量
export function sendInterviewEmail(tenantId, userId, name, email) { return request({ url: api.tenant + '/v1/email/sendInterview', method: 'post', data: { tenantId, userId, name, email }}) }

// 查询所有员工信息
export function archivesInfo(pageSize, pageNum, tenantId) { return request({ url: api.tenant + '/v1/staff/list', method: 'get', params: { pageSize, pageNum, tenantId }}) }

// 上传员工档案 excel
export function archivesUpload(tenantId, userId, file) { return request({ url: api.tenant + '/v1/staff/upload', method: 'post', data: { tenantId, userId, file }}) }

// 导出员工档案 excel
export function archivesExport(tenantId) { return request({ url: api.tenant + '/v1/staff/export', method: 'get', params: { tenantId }}) }

// 首页 发送面试邀请

export function sendInterview(name, phone, interviewTime, address, mobile, contacts, email) { return request({ url: api.tenant + '/v1/sms/sendInterview', method: 'post', data: { name, phone, interviewTime, address, mobile, contacts, email }}) }





