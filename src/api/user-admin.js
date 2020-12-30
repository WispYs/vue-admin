import request from '@/utils/request'
import { userUrl } from './url.js'

// 用户注册登录(管理员)
export function adminLogin(data) {
  return request({
    url: `${userUrl}/admin/login`,
    method: 'post',
    data
  })
}

export function getAdminInfo(id) {
  return request({
    url: `${userUrl}/admin/${id}`,
    method: 'get'
  })
}
