import request from '@/utils/request'
import baseUrl from './url.js'

// 项目实施计划表
// 列表
export function fetchWorkshopPro(page, size, filter) {
  return request({
    url: `${baseUrl}/workshopproject/search/${page}/${size}`,
    method: 'post',
    data: filter
  })
}
// 详情
export function fetchWorkshopProDetail(id) {
  return request({
    url: `${baseUrl}/workshopproject/${id}`,
    method: 'get'
  })
}
// 新增
export function addWorkshopPro(data) {
  return request({
    url: `${baseUrl}/workshopproject`,
    method: 'post',
    data
  })
}
// 编辑
export function editWorkshopPro(id, data) {
  return request({
    url: `${baseUrl}/workshopproject/${id}`,
    method: 'put',
    data
  })
}
// 删除
export function deleteWorkshopPro(id) {
  return request({
    url: `${baseUrl}/workshopproject/${id}`,
    method: 'delete'
  })
}
