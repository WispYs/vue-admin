import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/mock-api/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/mock-api/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
