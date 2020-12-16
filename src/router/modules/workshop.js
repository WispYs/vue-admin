const workshopRouter = {
  path: 'workshop',
  name: 'Workshop',
  redirect: '/project/workshop/list',
  component: () => import('@/views/project/workshop/index'),
  meta: { title: '进行中项目' },
  children: [
    {
      path: 'list',
      name: 'WorkshopList',
      component: () => import('@/views/project/workshop/list'),
      meta: { title: '列表', noCache: true, activeMenu: '/project/workshop' },
      hidden: true
    },
    {
      path: 'create',
      name: 'WorkshopCreate',
      component: () => import('@/views/project/workshop/create'),
      meta: { title: '新建项目', noCache: true, activeMenu: '/project/workshop' },
      hidden: true
    },
    {
      path: 'edit/:id(\\w+)',
      name: 'WorkshopEdit',
      component: () => import('@/views/project/workshop/edit'),
      meta: { title: '编辑项目', noCache: true, activeMenu: '/project/workshop' },
      hidden: true
    },
    {
      path: 'detail/:id(\\w+)',
      name: 'WorkshopDetail',
      component: () => import('@/views/project/workshop/detail'),
      meta: { title: '查看项目', noCache: true, activeMenu: '/project/workshop' },
      hidden: true
    }
  ]
}

export default workshopRouter
