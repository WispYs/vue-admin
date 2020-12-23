const shelvedRouter = {
  path: 'shelved',
  name: 'Shelved',
  redirect: '/project/implplan/shelved/list',
  component: () => import('@/views/project/implplan/shelved/index'),
  meta: { title: '已搁置项目' },
  children: [
    {
      path: 'list',
      name: 'ShelvedList',
      component: () => import('@/views/project/implplan/shelved/list'),
      meta: { title: '列表', noCache: true, activeMenu: '/project/implplan/shelved' },
      hidden: true
    },
    {
      path: 'detail/:id(\\w+)',
      name: 'ShelvedDetail',
      component: () => import('@/views/project/implplan/shelved/detail'),
      meta: { title: '查看项目', noCache: true, activeMenu: '/project/implplan/shelved' },
      hidden: true
    }
  ]
}

export default shelvedRouter
