import request from '@/utils/request'
import baseUrl from './url.js'

export function fetchNewsList() {
  console.log(baseUrl)
  return request({
    url: `${baseUrl}/news`,
    method: 'get'
  })
}

// 折算标准柜累积量
export function fetchStandardCabinet(data) {
  return request({
    url: `${baseUrl}/shipmentcomplete/standardcabinet`,
    method: 'post',
    data
  })
}

// 季度任务数
export function fetchQuarterCount(data) {
  return request({
    url: `${baseUrl}/shipmentcomplete/countquarter`,
    method: 'post',
    data
  })
}

// 项目进度统计
export function fetchProjectProgress(page, size) {
  return request({
    url: `${baseUrl}/resourceload/runpro/${page}/${size}`,
    method: 'post'
  })
}

// 本周项目运行状态
export function fetchWorkingStatus() {
  return request({
    url: `${baseUrl}/weekplanshipment/countweek`,
    method: 'post'
  })
}
