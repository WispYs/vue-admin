const workshopRouter = {
  path: 'workshop',
  name: 'Workshop',
  redirect: '/project/implplan/workshop/list',
  component: () => import('@/views/project/implplan/workshop/index'),
  meta: { title: '进行中项目' },
  children: [
    {
      path: 'list',
      name: 'WorkshopList',
      component: () => import('@/views/project/implplan/workshop/list'),
      meta: { title: '列表', noCache: true, activeMenu: '/project/implplan/workshop' },
      hidden: true
    },
    {
      path: 'detail/:id(\\w+)',
      name: 'WorkshopDetail',
      component: () => import('@/views/project/implplan/workshop/detail'),
      meta: { title: '查看项目', noCache: true, activeMenu: '/project/implplan/workshop' },
      hidden: true
    }
  ]
}

export default workshopRouter
