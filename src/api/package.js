import { api } from '@/utils/api'
import request from '@/utils/request'

// 获取所有固定套餐信息
export function fixedList() { return request({ url: api.package + '/v1/pkg/fixedList', method: 'get' }) }

export function customList(tenantId) { return request({ url: api.package + '/v1/pkg/customList', method: 'get', params: { tenantId }}) }

// 获取单个套餐的所有子套餐项
// export function itemList(packageId) { return request({ url: api.package + '/v1/pkg/childListForPackage', method: 'get', params: { packageId }}) }
export function itemList(packageId) { return request({ url: api.package + '/v1/pkg/groupList', method: 'get', params: { packageId }}) }


// 获取所有子套餐项
export function childList() { return request({ url: api.package + '/v1/pkg/childList', method: 'get' }) }

// 删除自定义套餐
export function deleteCustom(tenantId, packageId) { return request({ url: api.package + '/v1/pkg/deleteCustom', method: 'post', data: { tenantId, packageId }}) }

// 批量上传候选人（package模块）
export function execlUpload(excelFile) { return request({ url: api.package + '/candidate/batchUpload', method: 'post', data: { excelFile }}) }

// 获取套餐详情
export function pkgDetails(packageId) { return request({ url: api.package + '/v1/pkg/id', method: 'get', params: {id: packageId } }) }
