const workingDaysRouter = {
  path: 'working-days',
  name: 'WorkingDays',
  redirect: '/project/working-days/list',
  component: () => import('@/views/project/working-days/index'),
  meta: { title: '上周工时' },
  children: [
    {
      path: 'list',
      name: 'WorkingDaysList',
      component: () => import('@/views/project/working-days/list'),
      meta: { title: '列表', noCache: true, activeMenu: '/project/working-days' },
      hidden: true
    },
    {
      path: 'create',
      name: 'WorkingDaysCreate',
      component: () => import('@/views/project/working-days/create'),
      meta: { title: '新建项目', noCache: true, activeMenu: '/project/working-days' },
      hidden: true
    },
    {
      path: 'edit/:id(\\w+)',
      name: 'WorkingDaysEdit',
      component: () => import('@/views/project/working-days/edit'),
      meta: { title: '编辑项目', noCache: true, activeMenu: '/project/working-days' },
      hidden: true
    },
    {
      path: 'detail/:id(\\w+)',
      name: 'WorkingDaysDetail',
      component: () => import('@/views/project/working-days/detail'),
      meta: { title: '查看项目', noCache: true, activeMenu: '/project/working-days' },
      hidden: true
    }
  ]
}

export default workingDaysRouter
