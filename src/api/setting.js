// 公司设置
import request from '@/utils/request'

// 获取角色列表
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}

// 获取公司信息
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}

// 删除角色
export function deleteRoleList(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}

// 修改角色
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}
// 获取角色详细
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}
// 新增角色
export function createRole(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
