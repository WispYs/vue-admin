import request from '@/utils/request'
import baseUrl from './url.js'

// 项目实施计划表
// 列表
export function fetchImplPlanPro(page, size, filter) {
  return request({
    url: `${baseUrl}/projectimplplan/search/${page}/${size}`,
    method: 'post',
    data: filter
  })
}
// 详情
export function fetchImplPlanProDetail(id) {
  return request({
    url: `${baseUrl}/projectimplplan/${id}`,
    method: 'get'
  })
}
// 新建
export function addImplPlanPro(data) {
  return request({
    url: `${baseUrl}/projectimplplan`,
    method: 'post',
    data
  })
}
// 编辑
export function editImplPlanPro(id, data) {
  return request({
    url: `${baseUrl}/projectimplplan/${id}`,
    method: 'put',
    data
  })
}
// 删除
export function deleteImplPlanPro(id) {
  return request({
    url: `${baseUrl}/projectimplplan/${id}`,
    method: 'delete'
  })
}
