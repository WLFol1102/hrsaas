<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构头部内容 -->

      <el-card class="tree-card">
        <tree-tool :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <!-- 具体名单 -->
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <tree-tool
            slot-scope="{ data }"
            :tree-node="data"
            @delDepts="getDepartments"
            @addDepts="addDepts"
            @editDepts="editDepts"
          />
        </el-tree>
      </el-card>

    </div>
    <add-dept
      ref="addDept"
      :show-dialog.sync="showDialog"
      :tree-node="node"
      @addDepts="getDepartments"
    />
  </div>
</template>

<script>
import TreeTool from './component/tree-tool.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import AddDept from './component/add-dept.vue'
export default {
  components: {
    TreeTool,
    AddDept
  },
  data() {
    return {
      departs: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      company: { name: '人才有限公司', manager: '负责人', id: '' },
      showDialog: false,
      node: null
    }
  },

  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      this.loading = true
      const result = await getDepartments()
      this.departs = tranListToTreeData(result.depts, '')
      this.loading = false
    },
    addDepts(node) {
      this.showDialog = true
      this.node = node
    },
    editDepts(node) {
      this.showDialog = true
      this.node = node
      this.$refs.addDept.getEditDepartment(node.id)
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
