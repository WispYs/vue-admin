const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  mobile: state => state.user.mobile,
  id: state => state.user.id,
  roles: state => state.user.roles
}
export default getters
