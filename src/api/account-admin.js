import request from '@/utils/request'
import { userUrl } from './url.js'

// 账号管理(管理员)
// 列表
export function fetchAccountList(page, size, filter) {
  return request({
    url: `${userUrl}/admin/search/${page}/${size}`,
    method: 'post',
    data: filter
  })
}
// 详情
export function fetchAccountDetail(id) {
  return request({
    url: `${userUrl}/admin/${id}`,
    method: 'get'
  })
}
// 新建
export function addAccount(data) {
  return request({
    url: `${userUrl}/admin`,
    method: 'post',
    data
  })
}
// 审核
export function auditAccount(id, data) {
  return request({
    url: `${userUrl}/admin/${id}`,
    method: 'put',
    data
  })
}
// 删除
export function deleteAccount(id) {
  return request({
    url: `${userUrl}/admin/${id}`,
    method: 'delete'
  })
}
