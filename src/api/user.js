import request from '@/utils/request'
const userUrl = 'http://192.168.50.104:9007'

export function login(data) {
  return request({
    url: `${userUrl}/user/login`,
    method: 'post',
    data
  })
}

export function getInfo(id) {
  return request({
    url: `${userUrl}/user/${id}`,
    method: 'get'
  })
}

export function register(data) {
  return request({
    url: `${userUrl}/user/register`,
    method: 'post',
    data
  })
}

// 后台暂时没有提供登出功能
export function logout() {
  return request({
    url: '',
    method: 'post'
  })
}
