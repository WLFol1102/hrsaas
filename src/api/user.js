import request from '@/utils/request'

// 登录接口
export function login(data) {
  // 返回一个promise对象
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取角色信息
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

// 获取显示头像
export function getUserDetaById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
