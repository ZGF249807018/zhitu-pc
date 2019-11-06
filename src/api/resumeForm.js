
import { api } from '@/utils/api'
import request from '@/utils/request2'

// 候选人提交面试资料  educationParamsList, workParamsList, familyParamsList 为数组
export function interviewSubmit(obj) { return request({ url: api.orderApi + '/v1/candidate/interviewSubmit', method: 'post', data: obj }) }

// 添加候选人
export function candidateAdd(obj) { return request({ url: api.orderApi + '/v1/candidate/add', method: 'post', data: obj }) }

// 添加自定义套餐
export function addCustom(tenantId, userId, name, groupCodeList, resumeCount, perfermanceCount) { return request({ url: api.report + '/v1/pkg/addCustom', method: 'post', data: { tenantId, userId, name, groupCodeList, resumeCount, perfermanceCount }}) }

export function orderInfo(tenantId, userId, packageId, candidateIdList) { return request({ url: api.orderApi + '/v1/order/create', method: 'post', data: { tenantId, userId, packageId, candidateIdList }}) }

// 消费接口
export function consume(obj) { return request({ url: api.orderApi + '/v1/billing/consume', method: 'post', data: obj }) }

// 候选人库更新候选人
export function candidateUpdate(obj) { return request({ url: api.orderApi + '/v1/candidate/edit', method: 'post', data: obj }) }

// 候选人授权
export function doAuthorization(obj) { return request({ url: api.orderApi + '/v1/candidate/doAuthorization', method: 'post', data: obj }) }
