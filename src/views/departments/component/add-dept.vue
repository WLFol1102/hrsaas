<template>
  <!-- 弹层组件 -->
  <el-dialog :title="showTitle" :visible="showDialog" @close="btnNo">
    <!-- 表单数据 -->
    <el-form
      ref="deptForm"
      label-width="120px"
      :model="formData"
      :rules="rules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" placeholder="请输入1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          placeholder="请选择"
          @focus="getEmployees"
        >
          <el-option
            v-for="item in employeesList"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          placeholder="请输入1-300个字符"
          type="textarea"
          :row="3"
        />
      </el-form-item>
    </el-form>

    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="btnOk">确认</el-button>
        <el-button size="small" type="primary" @click="btnNo">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import {
  addDepartment,
  getDepartments,
  getEditDepartment,
  updateDepartment
} from '@/api/departments'
import { getEmployees } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    // 不允许部门名称重复
    const checkNameRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      if (this.formData.id) {
        depts
          .filter(
            (item) =>
              item.pid === this.treeNode.pid && item.id !== this.treeNode.id
          )
          .some((item) => item.name === this.treeNode.name)
          ? callback(new Error('部门名称重复'))
          : callback()
      } else {
        depts
          .filter((item) => item.pid === this.treeNode.id)
          .some((item) => item.name === value)
          ? callback(new Error('部门名称重复'))
          : callback()
      }
    }
    const checkCodeRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      if (this.formData.id) {
        depts
          .filter((item) => item.id !== this.treeNode.id)
          .some((item) => item.code === value && value)
          ? callback(new Error('部门编码重复'))
          : callback()
      } else {
        depts.some((item) => item.code === value && value)
          ? callback(new Error('部门编码重复'))
          : callback()
      }
    }
    return {
      employeesList: [],
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', tirgger: blur },
          {
            min: 1,
            max: 50,
            message: '部门名称字符限制1-50位字符',
            tirgger: blur
          },
          { validator: checkNameRepeat, tirgger: blur }
        ],
        code: [
          { required: true, message: '部门编码不能为空', tirgger: blur },
          {
            min: 1,
            max: 50,
            message: '部门名称字符限制1-50位字符',
            tirgger: blur
          },
          { validator: checkCodeRepeat, tirgger: blur }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', tirgger: blur }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', tirgger: blur },
          {
            min: 1,
            max: 300,
            message: '部门名称字符限制1-300位字符',
            tirgger: blur
          }
        ]
      }
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增子部门'
    }
  },
  methods: {
    async getEmployees() {
      this.employeesList = await getEmployees()
    },
    btnOk() {
      this.$refs.deptForm.validate(async(isOk) => {
        if (isOk) {
          if (this.formData.id) {
            await updateDepartment(this.formData)
          } else {
            await addDepartment({ ...this.formData, pid: this.treeNode.id })
          }
          this.$emit('addDepts')
          this.$emit('update:showDialog', false)
        }
      })
    },
    btnNo() {
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      this.$refs.deptForm.resetFields()
      this.$emit('update:showDialog', false)
    },
    async getEditDepartment(id) {
      this.formData = await getEditDepartment(id)
    }
  }
}
</script>

<style>
</style>
