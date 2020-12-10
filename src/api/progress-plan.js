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
// 新建
export function addProgressPlan(data) {
  return request({
    url: `${baseUrl}/resourceload`,
    method: 'post',
    data
  })
}
// 获取项目名称筛选项
export function fetchPlanProName() {
  return request({
    url: `${baseUrl}/resourceload/querypronamelist`,
    method: 'get'
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
