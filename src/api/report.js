import { api } from '@/utils/api'
import request from '@/utils/request'

// 统计背调报告数
export function reportCount(tenantId, startTime, endTime) { return request({ url: api.report + '/v1/report/count', method: 'get', params: { tenantId, startTime, endTime }}) }

// 报告列表
export function reportList(tenantId, userId, candidateName, startTime, endTime, pageSize, pageNum) { return request({ url: api.report + '/v1/report/list', method: 'post', data: { tenantId, userId, candidateName, startTime, endTime, pageSize, pageNum }}) }

// 统计处理中和已取消的背调订单数
export function statistics(tenantId, startTime, endTime) { return request({ url: api.orderApi + '/v1/order/statistics', method: 'get', params: { tenantId, startTime, endTime }}) }

// 背调报告-查看报告
export function reportView(orderNo) { return request({ url: api.report + '/v1/report/view', method: 'get', params: { orderNo }}) }

// 背调报告-批量发送报告
export function reportSend(orders, uids) { return request({ url: api.report + '/v1/report/send', method: 'post', data: { orders, uids }}) }

export function reportDownload(orders) { return request({ url: api.report + '/v1/report/download', method: 'post', data: { orders }}) }

// 创建体验报告
export function createTasteReport(tenantId, userId, packageId, mobile, username, idcard) { return request({ url: api.orderApi + '/v1/order/createTasteOrder', method: 'post', data: { tenantId, userId, packageId, mobile, username, idcard }}) }

// 获取所有固定套餐信息
export function fixedList() { return request({ url: api.report + '/v1/pkg/fixedList', method: 'get' }) }

export function customList(tenantId) { return request({ url: api.report + '/v1/pkg/customList', method: 'get', params: { tenantId }}) }

// 获取单个套餐的所有子套餐项
// export function itemList(packageId) { return request({ url: api.report + '/v1/pkg/childListForPackage', method: 'get', params: { packageId }}) }
export function itemList(packageId) { return request({ url: api.report + '/v1/pkg/groupList', method: 'get', params: { packageId }}) }


// 获取所有子套餐项
export function childList() { return request({ url: api.report + '/v1/pkg/childList', method: 'get' }) }

// 删除自定义套餐
export function deleteCustom(tenantId, packageId) { return request({ url: api.report + '/v1/pkg/deleteCustom', method: 'post', data: { tenantId, packageId }}) }

// 批量上传候选人（package模块）
export function execlUpload(excelFile) { return request({ url: api.report + '/candidate/batchUpload', method: 'post', data: { excelFile }}) }

// 获取套餐详情
export function pkgDetails(packageId) { return request({ url: api.report + '/v1/pkg/id', method: 'get', params: {id: packageId } }) }
