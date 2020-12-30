import request from '@/utils/request'
import { baseUrl } from './url.js'

// 日工时登记表
// 获取项目编号列表
export function fetchProNo() {
  return request({
    url: `${baseUrl}/resourceload/querypronolist`,
    method: 'get'
  })
}
// 根据项目编号查询所有项目名字，编号，类型，风险信息
export function fetchProDetail(id) {
  return request({
    url: `${baseUrl}/resourceload/queryproinfo/${id}`,
    method: 'get'
  })
}

// 列表
export function fetchDailyWork(page, size, filter) {
  return request({
    url: `${baseUrl}/resourceload/search/${page}/${size}`,
    method: 'post',
    data: filter
  })
}
// 详情
export function fetchDailyWorkDetail(id) {
  return request({
    url: `${baseUrl}/resourceload/${id}`,
    method: 'get'
  })
}
// 新增
export function addDailyWork(data) {
  return request({
    url: `${baseUrl}/resourceload`,
    method: 'post',
    data
  })
}
// 编辑
export function editDailyWork(id, data) {
  return request({
    url: `${baseUrl}/resourceload/${id}`,
    method: 'put',
    data
  })
}
// 删除
export function deleteDailyWork(id) {
  return request({
    url: `${baseUrl}/resourceload/${id}`,
    method: 'delete'
  })
}

