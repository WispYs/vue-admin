const workingRouter = {
  path: 'working',
  name: 'Working',
  redirect: '/project/implplan/working/list',
  component: () => import('@/views/project/implplan/working/index'),
  meta: { title: '进行中项目' },
  children: [
    {
      path: 'list',
      name: 'WorkingList',
      component: () => import('@/views/project/implplan/working/list'),
      meta: { title: '列表', noCache: true, activeMenu: '/project/implplan/working' },
      hidden: true
    },
    {
      path: 'detail/:id(\\w+)',
      name: 'WorkingDetail',
      component: () => import('@/views/project/implplan/working/detail'),
      meta: { title: '查看项目', noCache: true, activeMenu: '/project/implplan/working' },
      hidden: true
    }
  ]
}

export default workingRouter
