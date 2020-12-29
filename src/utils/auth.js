import Cookies from 'js-cookie'

const TokenKey = 'ld_admin_token'
const IdKey = 'ld_admin_id'
const RolesKey = 'ld_admin_roles'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  console.log(token)
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserId() {
  return Cookies.get(IdKey)
}

export function setUserId(id) {
  console.log(id)
  return Cookies.set(IdKey, id)
}

export function removeUserId() {
  return Cookies.remove(IdKey)
}

// 因为普通用户和管理员的登录、获取用户信息、查看用户列表等接口均不同
// 刷新页面的时候需要从本地cookie获取用户角色以便区分
export function getUserRoles() {
  return Cookies.get(RolesKey)
}

export function setUserRoles(roles) {
  console.log(roles)
  return Cookies.set(RolesKey, roles)
}

export function removeUserRoles() {
  return Cookies.remove(RolesKey)
}
