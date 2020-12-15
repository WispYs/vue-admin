import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import completeRouter from './modules/complete'
import implplanRouter from './modules/implplan'
import workshopRouter from './modules/workshop'
import shipmentCompleteRouter from './modules/shipment-complete'
import weekplanRouter from './modules/weekplan'
import progressPlanRouter from './modules/progress-plan'
import workingDaysRouter from './modules/working-days'
import dailyRouter from './modules/daily'
import workAllotRouter from './modules/work-allot'
import personInfoRouter from './modules/person-info'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/project',
    component: Layout,
    redirect: '/project/implplan',
    name: 'Project',
    meta: { title: '项目管理', icon: 'el-icon-s-help' },
    children: [
      implplanRouter,
      completeRouter,
      workshopRouter,
      shipmentCompleteRouter,
      weekplanRouter,
      progressPlanRouter,
      workingDaysRouter,
      dailyRouter
    ]
  },
  {
    path: '/personnel',
    component: Layout,
    redirect: '/personnel/work-allot/list',
    name: 'Personnel',
    meta: { title: '员工管理', icon: 'user' },
    children: [
      workAllotRouter,
      personInfoRouter
    ]
  },
  // {
  //   path: '/publish',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Publish',
  //       component: () => import('@/views/publish/index'),
  //       meta: { title: '消息发布', icon: 'component' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
