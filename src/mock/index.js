
import Mock from 'mockjs'

// 登录
Mock.mock('/mock-api/login', 'post', {
  'code': 20000,
  'data':
    {
      token: /[0-9]{2}[A-Z]{7}/
    }
})

// 用户信息
const infoUrl = '/mock-api/user/info'
Mock.mock(RegExp(infoUrl + '.*'), 'get', {
  'code': 20000,
  'data':
    {
      roles: ['admin'],
      introduction: 'I am a super administrator',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Super Admin'
    }
})

// 项目进度
Mock.mock('/mock-api/project/progress', 'get', {
  'code': 20000,
  'data|5': [
    { 'title': '@region@cword(3,7)项目', 'progress|1-100': 1 }
  ]
})
