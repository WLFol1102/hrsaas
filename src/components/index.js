// 全局自定义组件的注册
import pageTools from './pageTools'
import uploadExcel from './uploadExcel'
import imageUpLoad from './imageUpLoad'
export default {
  install(Vue) {
    // 组件的注册
    Vue.component('pageTools', pageTools)
    Vue.component('uploadExcel', uploadExcel) // 注册导入excel组件
    Vue.component('imageUpLoad', imageUpLoad) // 上传图片组件
  }
}
