const deliveredRouter = {
  path: 'delivered',
  name: 'Delivered',
  redirect: '/project/implplan/delivered/list',
  component: () => import('@/views/project/implplan/delivered/index'),
  meta: { title: '已发货项目' },
  children: [
    {
      path: 'list',
      name: 'DeliveredList',
      component: () => import('@/views/project/implplan/delivered/list'),
      meta: { title: '列表', noCache: true, activeMenu: '/project/implplan/delivered' },
      hidden: true
    },
    {
      path: 'detail/:id(\\w+)',
      name: 'DeliveredDetail',
      component: () => import('@/views/project/implplan/delivered/detail'),
      meta: { title: '查看项目', noCache: true, activeMenu: '/project/implplan/delivered' },
      hidden: true
    }
  ]
}

export default deliveredRouter
