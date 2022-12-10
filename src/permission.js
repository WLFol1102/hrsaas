// 权限拦截 路由跳转 导航守卫

import router from '@/router'
import store from '@/store'
import nProgress from 'nprogress'// 进度条
import 'nprogress/nprogress.css'

// 前置守卫 next是前置守卫的钩子  next()跳过 next(false) 终止跳转 next(path) 跳转路径
const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  nProgress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.userId) {
        const { roles } = await store.dispatch('user/getUserInfo')
        const routes = await store.dispatch('permission/filterRoutes', roles.menus)// 筛选当前用户权限下的动态路由
        router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }]) // 添加到路由表
        next(to.path)
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  nProgress.done()
})
// 后置守卫
router.afterEach(() => {
  nProgress.done()
})

