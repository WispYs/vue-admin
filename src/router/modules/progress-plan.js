const progressPlanRouter = {
  path: 'progress-plan',
  name: 'ProgressPlan',
  redirect: '/project/progress-plan/list',
  component: () => import('@/views/project/progress-plan/index'),
  meta: { title: '项目进度预算' },
  children: [
    {
      path: 'list',
      name: 'ProgressPlanList',
      component: () => import('@/views/project/progress-plan/list'),
      meta: { title: '列表', noCache: true, activeMenu: '/project/progress-plan' },
      hidden: true
    },
    {
      path: 'create',
      name: 'ProgressPlanCreate',
      component: () => import('@/views/project/progress-plan/create'),
      meta: { title: '新建项目', noCache: true, activeMenu: '/project/progress-plan' },
      hidden: true
    },
    {
      path: 'edit/:id(\\w+)',
      name: 'ProgressPlanEdit',
      component: () => import('@/views/project/progress-plan/edit'),
      meta: { title: '编辑项目', noCache: true, activeMenu: '/project/progress-plan' },
      hidden: true
    },
    {
      path: 'detail/:id(\\w+)',
      name: 'ProgressPlanDetail',
      component: () => import('@/views/project/progress-plan/detail'),
      meta: { title: '查看项目', noCache: true, activeMenu: '/project/progress-plan' },
      hidden: true
    }
  ]
}

export default progressPlanRouter
