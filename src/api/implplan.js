import request from '@/utils/request'
import baseUrl from './url.js'

// 项目实施计划表
// 列表
export function fetchImplplanPro(page, size, filter) {
  return request({
    url: `${baseUrl}/projectimplplan/search/${page}/${size}`,
    method: 'post',
    data: filter
  })
}
// 详情
export function fetchImplplanProDetail(id) {
  return request({
    url: `${baseUrl}/projectimplplan/${id}`,
    method: 'get'
  })
}
// 新增
export function addImplplanPro(data) {
  return request({
    url: `${baseUrl}/projectimplplan`,
    method: 'post',
    data
  })
}
// 编辑
export function editImplplanPro(id, data) {
  return request({
    url: `${baseUrl}/projectimplplan/${id}`,
    method: 'put',
    data
  })
}
// 删除
export function deleteImplplanPro(id) {
  return request({
    url: `${baseUrl}/projectimplplan/${id}`,
    method: 'delete'
  })
}
