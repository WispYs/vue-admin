import request from '@/utils/request'
import baseUrl from './url.js'

export function fetchList(params) {
  return request({
    url: `${baseUrl}/project`,
    method: 'get',
    params
  })
}

export function fetchInfo(id) {
  return request({
    url: `${baseUrl}/info`,
    method: 'get',
    params: {
      id
    }
  })
}

