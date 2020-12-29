import { login, logout, getInfo, register } from '@/api/user'
import { adminLogin, getAdminInfo } from '@/api/user-admin'
import { getToken, setToken, removeToken, getUserId, setUserId, removeUserId, getUserRoles, setUserRoles, removeUserRoles } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    id: getUserId(),
    roles: getUserRoles(),
    name: '',
    avatar: '',
    mobile: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_MOBILE: (state, mobile) => {
    state.mobile = mobile
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 普通用户登录
  login({ commit }, userInfo) {
    const { mobile, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ mobile: mobile.trim(), password: password }).then(response => {
        const data = response.data
        console.dir(response, data)
        commit('SET_TOKEN', data.token)
        commit('SET_ID', data.id)
        setToken(data.token)
        setUserId(data.id)
        setUserRoles(data.role)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 管理员登录
  adminLogin({ commit }, userInfo) {
    const { loginname, password } = userInfo
    return new Promise((resolve, reject) => {
      adminLogin({ loginname: loginname.trim(), password: password }).then(response => {
        const data = response.data
        console.dir(response, data)
        commit('SET_TOKEN', data.token)
        commit('SET_ID', data.id)
        setToken(data.token)
        setUserId(data.id)
        setUserRoles(data.role)
        resolve(response)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  register({ commit }, userInfo) {
    const { mobile, username, password } = userInfo
    return new Promise((resolve, reject) => {
      register({ mobile: mobile.trim(), nickname: username, password: password }).then(response => {
        commit('SET_MOBILE', mobile.trim())
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    console.log('getInfo')
    return new Promise((resolve, reject) => {
      getInfo(state.id).then(response => {
        const { data } = response
        if (!data) {
          return reject('获取用户信息失败，请重新登陆')
        }

        const { nickname, avatar } = data

        commit('SET_NAME', nickname)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取管理员信息
  getAdminInfo({ commit, state }) {
    console.log('getAdminInfo')
    return new Promise((resolve, reject) => {
      getAdminInfo(state.id).then(response => {
        const { data } = response
        if (!data) {
          return reject('获取用户信息失败，请重新登陆')
        }

        const { loginname, avatar } = data

        commit('SET_NAME', loginname)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        removeToken() // must remove  token  first
        removeUserId()
        removeUserRoles()
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }, 0)
      // 后台暂时没有提供登出功能
      // logout(state.token).then(() => {
      //   removeToken() // must remove  token  first
      //   removeUserId()
      //   resetRouter()
      //   commit('RESET_STATE')
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeUserId()
      removeUserRoles()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

