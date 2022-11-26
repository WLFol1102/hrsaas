// 员工相关请求
import request from '@/utils/request'

export function getEmployees() {
  // 获取员工简单列表
  return request({
    url: '/sys/user/simple',
    method: 'GET'
  })
}

// 获取综合列表
export function getEmployeesList(params) {
  return request({
    url: '/sys/user',
    method: 'GET',
    params
  })
}

// 删除员工
export function delEmployees(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

// 新增员工
export function createEmployees(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

// 导入员工数据
export function importEmployees(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
