import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import Component from '@/components'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import checkPermisson from './mixin/checkPermisson'
import * as filters from '@/filters' // 过滤器
import * as directives from '@/directives'
import '@/icons' // icon
import '@/permission' // permission control
// 全局注册所有自定义指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(Component)
Vue.mixin(checkPermisson)
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
