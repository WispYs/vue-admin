const completeRouter = {
  path: 'complete',
  name: 'Complete',
  redirect: '/project/complete/list',
  component: () => import('@/views/project/complete/index'),
  meta: { title: '已完成项目' },
  children: [
    {
      path: 'list',
      name: 'CompleteList',
      component: () => import('@/views/project/complete/list'),
      meta: { title: '列表', noCache: true, activeMenu: '/project/complete' },
      hidden: true
    },
    {
      path: 'create',
      name: 'CompleteCreate',
      component: () => import('@/views/project/complete/create'),
      meta: { title: '新建项目', noCache: true, activeMenu: '/project/complete' },
      hidden: true
    },
    {
      path: 'edit/:id(\\w+)',
      name: 'CompleteEdit',
      component: () => import('@/views/project/complete/edit'),
      meta: { title: '编辑项目', noCache: true, activeMenu: '/project/complete' },
      hidden: true
    },
    {
      path: 'detail/:id(\\w+)',
      name: 'CompleteDetail',
      component: () => import('@/views/project/complete/detail'),
      meta: { title: '查看项目', noCache: true, activeMenu: '/project/complete' },
      hidden: true
    }
  ]
}

export default completeRouter
