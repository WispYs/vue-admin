const notStartedRouter = {
  path: 'not-started',
  name: 'NotStarted',
  redirect: '/project/implplan/not-started/list',
  component: () => import('@/views/project/implplan/not-started/index'),
  meta: { title: '未开始项目' },
  children: [
    {
      path: 'list',
      name: 'NotStartedList',
      component: () => import('@/views/project/implplan/not-started/list'),
      meta: { title: '列表', noCache: true, activeMenu: '/project/implplan/not-started' },
      hidden: true
    },
    {
      path: 'detail/:id(\\w+)',
      name: 'NotStartedDetail',
      component: () => import('@/views/project/implplan/not-started/detail'),
      meta: { title: '查看项目', noCache: true, activeMenu: '/project/implplan/not-started' },
      hidden: true
    }
  ]
}

export default notStartedRouter
