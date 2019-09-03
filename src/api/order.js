import { api } from '@/utils/api'
import request from '@/utils/request'

// 查询订单列表
export function backgroundList(tenantId, startTime, endTime, candidateName, status, pageSize, pageNum) { return request({ url: api.orderApi + '/v1/order/list', method: 'get', params: { tenantId, startTime, endTime, candidateName, status, pageSize, pageNum }}) }

// 背调订单详情
export function backgroundDetails(tenantId, orderNo) { return request({ url: api.orderApi + '/v1/order/detail', method: 'get', params: { tenantId, orderNo }}) }

// 验证候选人是否已填写过面试资料
export function validateCandidateNo(candidateNo) { return request({ url: api.orderApi + '/v1/candidate/validateCandidateNo', method: 'get', params: { candidateNo }}) }

// 取消订单
export function cancelOrder(tenantId, orderNo) { return request({ url: api.orderApi + '/v1/order/cancel', method: 'post', params: { tenantId, orderNo }}) }

// 查询候选人
export function candidateList(info) { return request({ url: api.orderApi + '/v1/candidate/list', method: 'post', data: info }) }

// 模糊查询候选人
export function candidateList2(info) { return request({ url: api.orderApi + '/v1/candidate/choose/list', method: 'post', data: info }) }

// 候选人详情
export function candidateDetail(candidateId) { return request({ url: api.orderApi + '/v1/candidate/detail', method: 'get', params: { candidateId }}) }

// 背调平台下单时获取普通活动基础信息
export function getWithOrder(totalFee) { return request({ url: api.orderApi + '/v1/generalActivity/getWithOrder', method: 'get', params: { totalFee }}) }

// 背调平台下单时获取有效的优惠券
export function getCouponWithOrder(tenantId, fee) { return request({ url: api.orderApi + '/v1/couponRecord/getCouponWithOrder', method: 'get', params: { tenantId, fee }}) }

// 消费接口
export function consume(obj) { return request({ url: api.orderApi + '/v1/billing/consume', method: 'post', data: obj }) }

// 判断微信支付是否支付成功
export function orderStatus(tradeNo) { return request({ url: api.orderApi + '/v1/billing/getStatus', method: 'get', params: { tradeNo }}) }

// 批量下载候选人 pdf
export function batchDownload(tenantId, candidateIdList) { return request({ url: api.orderApi + '/v1/candidate/batchDownload', method: 'get', params: { tenantId, candidateIdList }}) }

// 候选人填写面试资料时3要素验证
export function candidateCheck(info) { return request({ url: api.orderApi + '/v1/candidate/check', method: 'post', data: info }) }

// 候选人授权页面获取候选人详情
export function getDetail(tenantId, candidateId, orderNo) { return request({ url: api.orderApi + '/v1/candidate/getDetail', method: 'get', params: { tenantId, candidateId, orderNo }}) }

// 删除候选人
export function candidateDelete(candidateId) { return request({ url: api.orderApi + '/v1/candidate/delete', method: 'post', data: { candidateId }}) }

// 批量上传候选人--确认订单
export function importOrders(orderSerialNumber, packageId) { return request({ url: api.orderApi + '/v1/order/importOrders', method: 'post', data: { orderSerialNumber, packageId }}) }



