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
    },
    {
      path: 'create',
      name: 'LastWeekWorksCreate',
      component: () => import('@/views/project/last-week-works/create'),
      meta: { title: '新建项目', noCache: true, activeMenu: '/project/last-week-works' },
      hidden: true
    },
    {
      path: 'edit/:id(\\w+)',
      name: 'LastWeekWorksEdit',
      component: () => import('@/views/project/last-week-works/edit'),
      meta: { title: '编辑项目', noCache: true, activeMenu: '/project/last-week-works' },
      hidden: true
    },
    {
      path: 'detail/:id(\\w+)',
      name: 'LastWeekWorksDetail',
      component: () => import('@/views/project/last-week-works/detail'),
      meta: { title: '查看项目', noCache: true, activeMenu: '/project/last-week-works' },
      hidden: true
    }
  ]
}

export default lastWeekWorksRouter
