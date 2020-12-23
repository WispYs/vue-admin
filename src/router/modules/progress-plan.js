const progressPlanRouter = {
  path: 'progress-plan',
  name: 'ProgressPlan',
  redirect: '/project/progress-plan/list',
  component: () => import('@/views/project/progress-plan/index'),
  meta: { title: '项目人工核算' },
  children: [
    {
      path: 'list',
      name: 'ProgressPlanList',
      component: () => import('@/views/project/progress-plan/list'),
      meta: { title: '列表', noCache: true, activeMenu: '/project/progress-plan' },
      hidden: true
    }
  ]
}

export default progressPlanRouter
