const dailyRouter = {
  path: 'daily',
  name: 'Daily',
  redirect: '/project/daily/create',
  component: () => import('@/views/project/daily/index'),
  meta: { title: '日工时登记表' },
  children: [
    {
      path: 'create',
      name: 'DailyCreate',
      component: () => import('@/views/project/daily/create'),
      meta: { title: '新建日报', noCache: true, activeMenu: '/project/daily' },
      hidden: true
    }
  ]
}

export default dailyRouter
