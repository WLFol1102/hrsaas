<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共{{ page.total }}条记录</span>
        <template slot="after">
          <el-button size="small" type="success" @click="$router.push('/import')">Excel导入</el-button>
          <el-button size="small" type="danger" @click="exportExcel">Excel导出</el-button>
          <el-button size="small" type="primary" @click="showDialog=true">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card v-loading="loading">
        <el-table border :data="list">
          <el-table-column label="序号" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="头像" width="120px">
            <template v-slot="{row}">
              <img
                slot="reference"
                v-imageerror="require('@/assets/common/bigUserHeader.png')"
                :src="row.staffPhoto"
                alt=""
                style="border-radius: 50%;width:100px;height:100px;padding:10px"
              >
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            :formatter="formateEmployees"
            prop="formOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template v-slot="{ row }">
              {{ row.timeOfEntry | formatDate() }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template v-slot="{ row }">
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template v-slot="{row}">
              <el-button type="text" size="small" @click="$router.push(`employees/detail/${row.id}`)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="editRole(row.id)">角色</el-button>
              <el-button type="text" size="small" @click="delEmployees(row.id)">删除</el-button>
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
          <el-pagination
            :current-page="page.page"
            :page-size="page.size"
            :total="page.total"
            @click="changePage(newPage)"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
    <add-employees :show-dialog.sync="showDialog" />
    <assginRole ref="assignRole" :show-role-dialog.sync="showRoleDialog" :user-id="userId" />
  </div>
</template>

<script>
import { getEmployeesList, delEmployees } from '@/api/employees'
import EmployeeFn from '@/api/constant/employees'
import AddEmployees from './components/add-employees.vue'
import { formatDate } from '@/filters'
import assginRole from './components/assgin-role.vue'
export default {
  components: {
    AddEmployees,
    assginRole
  },
  data() {
    return {
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0
      },
      loading: false,
      showDialog: false,
      showRoleDialog: false,
      userId: null
    }
  },
  created() {
    this.getEmployeesList()
  },
  methods: {
    changePage(newPage) {
      this.page.page = newPage
      this.getEmployeesList()
    },
    async getEmployeesList() {
      this.loading = true
      const { total, rows } = await getEmployeesList(this.page)
      this.page.total = total
      this.list = rows
      this.loading = false
    },
    formateEmployees(row, column, cellValue, index) {
      const obj = EmployeeFn.hireType.find((item) => item.id === cellValue)
      return obj ? obj.value : cellValue
    },
    async delEmployees(id) {
      try {
        await this.$confirm('确定删除')
        await delEmployees(id)
        this.$message.success('删除成功')
        this.getEmployeesList()
      } catch {
        console.log(Error)
      }
    },
    exportExcel() {
      const headers = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      import('@/vendor/Export2Excel').then(async excel => {
        const { rows } = await getEmployeesList({ page: 1, size: this.page.total })
        const data = this.formmateJson(headers, rows)
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data: data,
          filename: '员工工资表'

        })
        this.$message.success('引出成功')
      }).catch(() => { this.$message.error('引出错误') })
    },
    formmateJson(headers, rows) {
      return rows.map(item => {
        return Object.keys(headers).map(key => {
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            return formatDate(item[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            const en = EmployeeFn.hireType.find(obj => obj.id === item[headers[key]])
            // EmployeeEnum.hireType.find(obj => obj.id === item[headers[key]])
            return en ? en.value : '未知'
          } else {
            return item[headers[key]]
          }
        })
      })
    },
    async editRole(id) {
      this.userId = id
      await this.$refs.assignRole.getUserDetailById(id)// 调用子组件assginrole方法
      this.showRoleDialog = true
    }
  }
}

</script>

<style>
</style>
