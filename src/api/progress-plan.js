import request from '@/utils/request'
import baseUrl from './url.js'

// 项目进度计划
// 列表
export function fetchProgressPlan(page, size, filter) {
  return request({
    url: `${baseUrl}/workingdays/search/${page}/${size}`,
    method: 'post',
    data: filter
  })
}

