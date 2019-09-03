import { api } from '@/utils/api'
import request from '@/utils/request'

// 背调平台优惠券领取记录列表
export function couponList(tenantId, type, isExpired) { return request({ url: api.orderApi + '/v1/couponRecord/list', method: 'get', params: { tenantId, type, isExpired }}) }

// 资资产管理-优惠券使用记录
export function couponRecord(tenantId, type, pageNo, pageSize) { return request({ url: api.orderApi + '/v1/couponRecord/used/list', method: 'post', data: { tenantId, type, pageNo, pageSize }}) }
