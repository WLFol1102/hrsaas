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

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

/** **
 * 获取用户的岗位信息
 *
 * ****/
export function getJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}

/**
 * 保存岗位信息
 * ****/
export function updateJob(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}

// 用户分配角色
export function assignRoles(data) {
  return request({
    url: `/sys/user/assignRoles`,
    method: 'put',
    data
  })
}
