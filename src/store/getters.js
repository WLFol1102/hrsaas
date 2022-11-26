const getters = {
  // 快捷访问
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  name: state => state.user.userInfo.username, // 用户名映射
  userId: state => state.user.userInfo.userId, // 用户id快捷访问
  staffPhoto: state => state.user.userInfo.staffPhoto, // 用户头像获取
  companyId: state => state.user.userInfo.companyId// 获取公司id
}
export default getters
