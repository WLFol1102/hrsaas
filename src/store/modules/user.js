import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetaById } from '@/api/user'
import { resetRouter } from '@/router'
const state = {
  token: getToken(), // 设置token为共享状态 初始化vuex的时候 就先从缓存中读取
  userInfo: {}// 定义空对象
}

const mutations = {
  setUserToken(state, token) {
    state.token = token
    // 同步给缓存
    setToken(token)
    // 设置是时间戳
    setTimeStamp()
  },
  removeUserToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo // 用 浅拷贝的方式去赋值对象 因为这样数据更新之后，才会触发组件的更新
  },
  // 删除用户信息
  reomveUserInfo(state) {
    state.userInfo = {}
  }

}
const actions = {
  async login(context, data) {
    // 调用安排api的接口
    const result = await login(data)
    // console.log(result)
    context.commit('setUserToken', result)
  },
  // 获取用户资料action
  async getUserInfo(context) {
    const result = await getUserInfo() // 获取返回值
    // 获取用户详情
    const baseInfo = await getUserDetaById(result.userId)
    context.commit('setUserInfo', { ...result, ...baseInfo }) // 将整个的个人信息设置到用户的vuex数据中
    return result
  },
  // 登出操作
  logout(context) {
    context.commit('removeUserToken')
    context.commit('reomveUserInfo')
    resetRouter()// 重置路由
    context.commit('permission/setRoutes', [], { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
