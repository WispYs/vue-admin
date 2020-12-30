import request from '@/utils/request'
import { baseUrl } from './url.js'

// 成套已完成项目
// 列表
export function fetchCompletedPro(page, size, filter) {
  return request({
    url: `${baseUrl}/completeproject/searchcompleted/${page}/${size}`,
    method: 'post',
    data: filter
  })
}
// 详情
export function fetchCompletedProDetail(id) {
  return request({
    url: `${baseUrl}/completeproject/${id}`,
    method: 'get'
  })
}
// 新建
export function addCompletedPro(data) {
  return request({
    url: `${baseUrl}/completeproject`,
    method: 'post',
    data
  })
}
// 编辑
export function editCompletedPro(id, data) {
  return request({
    url: `${baseUrl}/completeproject/${id}`,
    method: 'put',
    data
  })
}
// 删除
export function deleteCompletedPro(id) {
  return request({
    url: `${baseUrl}/completeproject/${id}`,
    method: 'delete'
  })
}
