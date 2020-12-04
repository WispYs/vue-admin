import request from '@/utils/request'
import baseUrl from './url.js'

// 项目实施计划表
// 列表
export function fetchWeekplanPro(page, size, filter) {
  return request({
    url: `${baseUrl}/weekplanshipment/search/${page}/${size}`,
    method: 'post',
    data: filter
  })
}
// 详情
export function fetchWeekplanProDetail(id) {
  return request({
    url: `${baseUrl}/weekplanshipment/${id}`,
    method: 'get'
  })
}
// 新增
export function addWeekplanPro(data) {
  return request({
    url: `${baseUrl}/weekplanshipment`,
    method: 'post',
    data
  })
}
// 编辑
export function editWeekplanPro(id, data) {
  return request({
    url: `${baseUrl}/weekplanshipment/${id}`,
    method: 'put',
    data
  })
}
// 删除
export function deleteWeekplanPro(id) {
  return request({
    url: `${baseUrl}/weekplanshipment/${id}`,
    method: 'delete'
  })
}
