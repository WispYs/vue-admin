import request from '@/utils/request'
import baseUrl from './url.js'

// 车间成套项目
// 列表
export function fetchWorkingPro(page, size, filter) {
  return request({
    url: `${baseUrl}/workshopproject/search/${page}/${size}`,
    method: 'post',
    data: filter
  })
}
// 详情
export function fetchWorkingProDetail(id) {
  return request({
    url: `${baseUrl}/workshopproject/${id}`,
    method: 'get'
  })
}
// 新建
export function addWorkingPro(data) {
  return request({
    url: `${baseUrl}/workshopproject`,
    method: 'post',
    data
  })
}
// 编辑
export function editWorkingPro(id, data) {
  return request({
    url: `${baseUrl}/workshopproject/${id}`,
    method: 'put',
    data
  })
}
// 删除
export function deleteWorkingPro(id) {
  return request({
    url: `${baseUrl}/workshopproject/${id}`,
    method: 'delete'
  })
}
