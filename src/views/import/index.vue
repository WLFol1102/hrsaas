<template>
  <uploadExcel :on-success="success" />
</template>

<script>
export default {
  methods: {
    success({ header, results }) {
      debugger
      // 数据中英转置
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      results.forEach(itrm => {
        const userInfo = {}
        Object.keys(item).forEach(key => {
          userInfo[userRelations[key]] = item[key]
        })
      })
    }
  }
}
</script>

<style>
</style>
