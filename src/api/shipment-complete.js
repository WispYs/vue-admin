import request from '@/utils/request'
import baseUrl from './url.js'

// 发货已完成项目
// 列表
export function fetchShipmentComplete(page, size, filter) {
  return request({
    url: `${baseUrl}/shipmentcomplete/search/${page}/${size}`,
    method: 'post',
    data: filter
  })
}
// 详情
export function fetchShipmentCompleteDetail(id) {
  return request({
    url: `${baseUrl}/shipmentcomplete/${id}`,
    method: 'get'
  })
}
// 新建
export function addShipmentComplete(data) {
  return request({
    url: `${baseUrl}/shipmentcomplete`,
    method: 'post',
    data
  })
}
// 编辑
export function editShipmentComplete(id, data) {
  return request({
    url: `${baseUrl}/shipmentcomplete/${id}`,
    method: 'put',
    data
  })
}
// 删除
export function deleteShipmentComplete(id) {
  return request({
    url: `${baseUrl}/shipmentcomplete/${id}`,
    method: 'delete'
  })
}
