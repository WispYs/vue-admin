const completedRouter = {
  path: 'completed',
  name: 'Completed',
  redirect: '/project/implplan/completed/list',
  component: () => import('@/views/project/implplan/completed/index'),
  meta: { title: '已完成项目' },
  children: [
    {
      path: 'list',
      name: 'CompletedList',
      component: () => import('@/views/project/implplan/completed/list'),
      meta: { title: '列表', noCache: true, activeMenu: '/project/implplan/completed' },
      hidden: true
    },
    {
      path: 'detail/:id(\\w+)',
      name: 'CompletedDetail',
      component: () => import('@/views/project/implplan/completed/detail'),
      meta: { title: '查看项目', noCache: true, activeMenu: '/project/implplan/completed' },
      hidden: true
    }
  ]
}

export default completedRouter
