import request from '@/utils/request'
import baseUrl from './url.js'

// 本周计划发货项目
// 列表
export function fetchWorkingDays(page, size, filter) {
  return request({
    url: `${baseUrl}/workingdays/search/${page}/${size}`,
    method: 'post',
    data: filter
  })
}
// 详情
export function fetchWorkingDaysDetail(id) {
  return request({
    url: `${baseUrl}/workingdays/${id}`,
    method: 'get'
  })
}
// 新建
export function addWorkingDays(data) {
  return request({
    url: `${baseUrl}/workingdays`,
    method: 'post',
    data
  })
}
// 编辑
export function editWorkingDays(id, data) {
  return request({
    url: `${baseUrl}/workingdays/${id}`,
    method: 'put',
    data
  })
}
// 删除
export function deleteWorkingDays(id) {
  return request({
    url: `${baseUrl}/workingdays/${id}`,
    method: 'delete'
  })
}
