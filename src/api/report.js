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
export function createTasteReport(tenantId, userId, packageId, mobile, username, idcard) { return request({ url: api.report + '/v1/report/createTasteReport', method: 'post', data: { tenantId, userId, packageId, mobile, username, idcard }}) }
