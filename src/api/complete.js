import request from '@/utils/request'
import baseUrl from './url.js'

// 成套已完成项目
// 列表
export function fetchCompletePro(page, size, filter) {
  return request({
    url: `${baseUrl}/completeproject/search/${page}/${size}`,
    method: 'post',
    data: filter
  })
}
// 详情
export function fetchCompleteProDetail(id) {
  return request({
    url: `${baseUrl}/completeproject/${id}`,
    method: 'get'
  })
}
// 新增
export function addCompletePro(data) {
  return request({
    url: `${baseUrl}/completeproject`,
    method: 'post',
    data
  })
}
// 编辑
export function editCompletePro(id, data) {
  return request({
    url: `${baseUrl}/completeproject/${id}`,
    method: 'put',
    data
  })
}
// 删除
export function deleteCompletePro(id) {
  return request({
    url: `${baseUrl}/completeproject/${id}`,
    method: 'delete'
  })
}
