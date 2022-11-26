import request from '@/utils/request'
// 获取部门信息
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

// 删除部门
export function delDepartments(id) {
  return request({
    method: 'delete',
    url: `/company/department/${id}`
  })
}

// 新增部门
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}

// 部门详情获取
export function getEditDepartment(id) {
  return request({
    url: `/company/department/${id}`

  })
}

// 保存编辑
export function updateDepartment(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
