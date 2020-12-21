const dailyRouter = {
  path: 'daily',
  name: 'Daily',
  redirect: '/project/daily/list',
  component: () => import('@/views/project/daily/index'),
  meta: { title: '日工时登记表' },
  children: [
    {
      path: 'list',
      name: 'DailyList',
      component: () => import('@/views/project/daily/list'),
      meta: { title: '列表', noCache: true, activeMenu: '/project/daily' },
      hidden: true
    },
    {
      path: 'create',
      name: 'DailyCreate',
      component: () => import('@/views/project/daily/create'),
      meta: { title: '添加工时', noCache: true, activeMenu: '/project/daily' },
      hidden: true
    },
    {
      path: 'edit/:id(\\w+)',
      name: 'DailyEdit',
      component: () => import('@/views/project/daily/edit'),
      meta: { title: '编辑工时', noCache: true, activeMenu: '/project/daily' },
      hidden: true
    }
  ]
}

export default dailyRouter
