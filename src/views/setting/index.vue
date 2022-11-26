<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height: 60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="showDialog=true"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table border="" :data="list" highlight-current-row>
              <el-table-column
                align="center"
                label="序号"
                width="120"
                type="index"
              />
              <el-table-column
                align="center"
                label="角色名称"
                width="240"
                prop="name"
              />
              <el-table-column align="center" label="描述" prop="description" />
              <el-table-column align="center" label="操作">
                <template slot-scope="{ row }">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button
                    size="small"
                    type="primary"
                    @click="editRole(row.id)"
                  >编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="deleteRow(row.id)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <!-- 分页组件 -->
              <el-pagination
                :total="page.total"
                :page-size="page.pagesize"
                :current-page="page.page"
                layout="prev,pager,next"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="公司名称">
                <el-input value="人才有限公司 " disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  v-model="formDate.companyAddress"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  v-model="formDate.companyPhone"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  value="666 "
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <el-dialog title="编辑部门" :visible="showDialog" @close="btnCancel">
      <el-form
        ref="roleForm"
        :model="roleForm"
        :rules="rule"
        label-width="120px"
      >
        <el-form-item prop="name" label="角色名称">
          <el-input
            v-model="roleForm.name"
            type="text"
          /></el-form-item>
        <el-form-item prop="description" label="角色描述">
          <el-input
            v-model="roleForm.description"
            type="text"
          /></el-form-item>
      </el-form>
      <el-row type="flex" justify="center">
        <el-col :span="8">
          <el-button type="small" @click="btnCancel">取消</el-button>
          <el-button type="small" @click="btnOk">确认</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoleList,
  getCompanyInfo,
  deleteRoleList,
  updateRole,
  getRoleDetail,
  createRole
} from '@/api/setting'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      list: [],
      page: {
        page: 1,
        pagesize: 10,
        total: 0
      },
      formDate: {},
      showDialog: false,
      // 弹窗角色信息
      roleForm: {
        name: '',
        description: ''
      },
      rule: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '角色备注不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page)
      this.page.total = total
      this.list = rows
    },
    changePage(newPage) {
      this.page.page = newPage
      this.getRoleList()
    },
    async getCompanyInfo() {
      this.formDate = await getCompanyInfo(this.companyId)
    },
    async deleteRow(id) {
      try {
        await this.$confirm('确认删除该角色吗')
        await deleteRoleList(id)
        this.getRoleList()
      } catch (error) {
        console.log(error)
      }
    },
    async editRole(id) {
      this.roleForm = await getRoleDetail(id)
      this.showDialog = true // 为了不出现闪烁的问题 先获取数据 再弹出层
    },

    async btnOk() {
      try {
        await this.$refs.roleForm.validate()
        if (this.roleForm.id) {
          await updateRole(this.roleForm)
        } else {
          await createRole(this.roleForm)
        }
        this.getRoleList()
        this.$message.success('操作成功')
        this.btnCancel()
      } catch {
        console.log(Error)
      }
    },
    btnCancel() {
      this.roleForm = {
        name: '',
        description: ''

      }
      this.showDialog = false
      this.$refs.roleForm.resetFields()
    }
  }
}
</script>

<style>
</style>
