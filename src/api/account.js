import request from '@/utils/request'
import { userUrl } from './url.js'

// 账号管理(普通用户)
// 列表
export function fetchAccountList(page, size, filter) {
  return request({
    url: `${userUrl}/user/search/${page}/${size}`,
    method: 'post',
    data: filter
  })
}
// 详情
export function fetchAccountDetail(id) {
  return request({
    url: `${userUrl}/user/${id}`,
    method: 'get'
  })
}
// 新建
export function addAccount(data) {
  return request({
    url: `${userUrl}/user`,
    method: 'post',
    data
  })
}
// 审核
export function auditAccount(id, data) {
  return request({
    url: `${userUrl}/user/${id}`,
    method: 'put',
    data
  })
}
// 删除
export function deleteAccount(id) {
  return request({
    url: `${userUrl}/user/${id}`,
    method: 'delete'
  })
}
