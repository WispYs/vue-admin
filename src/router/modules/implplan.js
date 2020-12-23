import notStartedRouter from './not-started'
import workshopRouter from './workshop'
import completeRouter from './complete'
import shipmentCompleteRouter from './shipment-complete'
import shelvedRouter from './shelved'
const implplanRouter = {
  path: 'implplan',
  name: 'Implplan',
  component: () => import('@/views/project/implplan/index'),
  meta: { title: '生产计划表' },
  redirect: '/project/implplan/list',
  children: [
    {
      path: 'list',
      name: 'ImplplanList',
      component: () => import('@/views/project/implplan/list'),
      meta: { title: '总览', noCache: true, activeMenu: '/project/implplan/list' }
      // hidden: true
    },
    notStartedRouter,
    workshopRouter,
    completeRouter,
    shipmentCompleteRouter,
    shelvedRouter,
    {
      path: 'create',
      name: 'ImplplanCreate',
      component: () => import('@/views/project/implplan/create'),
      meta: { title: '新建项目', noCache: true, activeMenu: '/project/implplan/list' },
      hidden: true
    },
    {
      path: 'edit/:id(\\w+)',
      name: 'ImplplanEdit',
      component: () => import('@/views/project/implplan/edit'),
      meta: { title: '编辑项目', noCache: true, activeMenu: '/project/implplan/list' },
      hidden: true
    },
    {
      path: 'detail/:id(\\w+)',
      name: 'ImplplanDetail',
      component: () => import('@/views/project/implplan/detail'),
      meta: { title: '查看项目', noCache: true, activeMenu: '/project/implplan/list' },
      hidden: true
    }
  ]
}

export default implplanRouter
