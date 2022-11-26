<template>
  <!-- 下拉菜单组件 -->
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <!-- //下拉菜单 -->
        <el-col @click.stop>
          <el-dropdown trigger="click" @command="handleCommand">
            <span> 操作<i class="el-icon-arrow-down" /> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加</el-dropdown-item>
              <el-dropdown-item
                v-if="!isRoot"
                command="del"
              >删除</el-dropdown-item>
              <el-dropdown-item
                v-if="!isRoot"
                command="edit"
              >编辑</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  props: {
    treeNode: {
      required: true,
      type: Object
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCommand(type) {
      if (type === 'add') {
        this.$emit('addDepts', this.treeNode)
      } else if (type === 'edit') {
        this.$emit('editDepts', this.treeNode)
      } else {
        this.$confirm('确认删除吗').then(() => {
          return delDepartments(this.treeNode.id)
        }).then(() => {
          this.$emit('delDepts')
          this.$message.success('删除部门成功')
        })
      }
    }
  }
}
</script>

<style>
</style>
