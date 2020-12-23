const overviewRouter = {
  path: 'overview',
  name: 'Overview',
  redirect: '/project/implplan/overview/list',
  component: () => import('@/views/project/implplan/overview/index'),
  meta: { title: '总览' },
  children: [
    {
      path: 'list',
      name: 'OverviewList',
      component: () => import('@/views/project/implplan/overview/list'),
      meta: { title: '列表', noCache: true, activeMenu: '/project/implplan/overview' },
      hidden: true
    },
    {
      path: 'create',
      name: 'OverviewCreate',
      component: () => import('@/views/project/implplan/overview/create'),
      meta: { title: '新建项目', noCache: true, activeMenu: '/project/implplan/overview' },
      hidden: true
    },
    {
      path: 'edit/:id(\\w+)',
      name: 'OverviewEdit',
      component: () => import('@/views/project/implplan/overview/edit'),
      meta: { title: '编辑项目', noCache: true, activeMenu: '/project/implplan/overview' },
      hidden: true
    },
    {
      path: 'detail/:id(\\w+)',
      name: 'OverviewDetail',
      component: () => import('@/views/project/implplan/overview/detail'),
      meta: { title: '查看项目', noCache: true, activeMenu: '/project/implplan/overview' },
      hidden: true
    }
  ]
}

export default overviewRouter
