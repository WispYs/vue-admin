import request from '@/utils/request'
import { baseUrl } from './url.js'

// 员工信息
// 列表
export function fetchPersonInfo(page, size, filter) {
  return request({
    url: `${baseUrl}/staff/search/${page}/${size}`,
    method: 'post',
    data: filter
  })
}
// 详情
export function fetchPersonInfoDetail(id) {
  return request({
    url: `${baseUrl}/staff/${id}`,
    method: 'get'
  })
}
// 新建
export function addPersonInfo(data) {
  return request({
    url: `${baseUrl}/staff`,
    method: 'post',
    data
  })
}
// 编辑
export function editPersonInfo(id, data) {
  return request({
    url: `${baseUrl}/staff/${id}`,
    method: 'put',
    data
  })
}
// 删除
export function deletePersonInfo(id) {
  return request({
    url: `${baseUrl}/staff/${id}`,
    method: 'delete'
  })
}
