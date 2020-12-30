import request from '@/utils/request'
import { baseUrl } from './url.js'

// 工作安排

// 所有员工编号查询
export function fetchPersonNo() {
  return request({
    url: `${baseUrl}/staffmanagement/queryusernolist`,
    method: 'get'
  })
}
// 根据员工编号查询员工信息
export function fetchPersonDetail(id) {
  return request({
    url: `${baseUrl}/staffmanagement/queryusernamelistbyuserno/${id}`,
    method: 'get'
  })
}

// 列表
export function fetchWorkAllot(page, size, filter) {
  return request({
    url: `${baseUrl}/staffmanagement/search/${page}/${size}`,
    method: 'post',
    data: filter
  })
}
// 详情
export function fetchWorkAllotDetail(id) {
  return request({
    url: `${baseUrl}/staffmanagement/${id}`,
    method: 'get'
  })
}
// 新建
export function addWorkAllot(data) {
  return request({
    url: `${baseUrl}/staffmanagement`,
    method: 'post',
    data
  })
}
// 编辑
export function editWorkAllot(id, data) {
  return request({
    url: `${baseUrl}/staffmanagement/${id}`,
    method: 'put',
    data
  })
}
// 删除
export function deleteWorkAllot(id) {
  return request({
    url: `${baseUrl}/staffmanagement/${id}`,
    method: 'delete'
  })
}
