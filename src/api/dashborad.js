import request from '@/utils/request'
import baseUrl from './url.js'

export function fetchNewsList() {
  console.log(baseUrl)
  return request({
    url: `${baseUrl}/news`,
    method: 'get'
  })
}
