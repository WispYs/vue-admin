import request from '@/utils/request'
import { baseUrl } from './url.js'

// 发货已完成项目
// 列表
export function fetchDelivered(page, size, filter) {
  return request({
    url: `${baseUrl}/shipmentcomplete/searchcompleted/${page}/${size}`,
    method: 'post',
    data: filter
  })
}
// 详情
export function fetchDeliveredDetail(id) {
  return request({
    url: `${baseUrl}/shipmentcomplete/${id}`,
    method: 'get'
  })
}
// 新建
export function addDelivered(data) {
  return request({
    url: `${baseUrl}/shipmentcomplete`,
    method: 'post',
    data
  })
}
// 编辑
export function editDelivered(id, data) {
  return request({
    url: `${baseUrl}/shipmentcomplete/${id}`,
    method: 'put',
    data
  })
}
// 删除
export function deleteDelivered(id) {
  return request({
    url: `${baseUrl}/shipmentcomplete/${id}`,
    method: 'delete'
  })
}
