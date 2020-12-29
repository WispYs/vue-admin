import request from '@/utils/request'
const userUrl = 'http://192.168.50.104:9007'

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
