const lastWeekWorksRouter = {
  path: 'last-week-works',
  name: 'LastWeekWorks',
  redirect: '/project/last-week-works/list',
  component: () => import('@/views/project/last-week-works/index'),
  meta: { title: '上周生产工时' },
  children: [
    {
      path: 'list',
      name: 'LastWeekWorksList',
      component: () => import('@/views/project/last-week-works/list'),
      meta: { title: '列表', noCache: true, activeMenu: '/project/last-week-works' },
      hidden: true
    }
  ]
}

export default lastWeekWorksRouter
