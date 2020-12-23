const completeRouter = {
  path: 'complete',
  name: 'Complete',
  redirect: '/project/implplan/complete/list',
  component: () => import('@/views/project/implplan/complete/index'),
  meta: { title: '已完成项目' },
  children: [
    {
      path: 'list',
      name: 'CompleteList',
      component: () => import('@/views/project/implplan/complete/list'),
      meta: { title: '列表', noCache: true, activeMenu: '/project/implplan/complete' },
      hidden: true
    },
    {
      path: 'detail/:id(\\w+)',
      name: 'CompleteDetail',
      component: () => import('@/views/project/implplan/complete/detail'),
      meta: { title: '查看项目', noCache: true, activeMenu: '/project/implplan/complete' },
      hidden: true
    }
  ]
}

export default completeRouter
