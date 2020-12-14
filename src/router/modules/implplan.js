const implplanRouter = {
  path: 'implplan',
  name: 'Implplan',
  redirect: '/project/implplan/list',
  component: () => import('@/views/project/implplan/index'),
  meta: { title: '成套生产计划表' },
  children: [
    {
      path: 'list',
      name: 'ImplplanList',
      component: () => import('@/views/project/implplan/list'),
      meta: { title: '列表', noCache: true, activeMenu: '/project/implplan' },
      hidden: true
    },
    {
      path: 'create',
      name: 'ImplplanCreate',
      component: () => import('@/views/project/implplan/create'),
      meta: { title: '新建项目', noCache: true, activeMenu: '/project/implplan' },
      hidden: true
    },
    {
      path: 'edit/:id(\\w+)',
      name: 'ImplplanEdit',
      component: () => import('@/views/project/implplan/edit'),
      meta: { title: '编辑项目', noCache: true, activeMenu: '/project/implplan' },
      hidden: true
    },
    {
      path: 'detail/:id(\\w+)',
      name: 'ImplplanDetail',
      component: () => import('@/views/project/implplan/detail'),
      meta: { title: '查看项目', noCache: true, activeMenu: '/project/implplan' },
      hidden: true
    }
  ]
}

export default implplanRouter
