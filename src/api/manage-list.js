import request from '@/utils/request'
import baseUrl from './url.js'

export function fetchList(params) {
  console.log(baseUrl)
  return request({
    url: `${baseUrl}/project`,
    method: 'get',
    params
  })
}
