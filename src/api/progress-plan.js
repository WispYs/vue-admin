import request from '@/utils/request'
import baseUrl from './url.js'

// 资源&负荷进度计划
// 列表
export function fetchProgressPlan(page, size, filter) {
  return request({
    url: `${baseUrl}/resourceload/search/${page}/${size}`,
    method: 'post',
    data: filter
  })
}
// 详情
export function fetchProgressPlanDetail(id) {
  return request({
    url: `${baseUrl}/resourceload/${id}`,
    method: 'get'
  })
}
// 新增
export function addProgressPlan(data) {
  return request({
    url: `${baseUrl}/resourceload`,
    method: 'post',
    data
  })
}
// 编辑
export function editProgressPlan(id, data) {
  return request({
    url: `${baseUrl}/resourceload/${id}`,
    method: 'put',
    data
  })
}
// 删除
export function deleteProgressPlan(id) {
  return request({
    url: `${baseUrl}/resourceload/${id}`,
    method: 'delete'
  })
}
