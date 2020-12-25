const workAllotRouter = {
  path: 'work-allot',
  name: 'WorkAllot',
  redirect: '/personnel/work-allot/list',
  component: () => import('@/views/personnel/work-allot/index'),
  meta: { title: '工作考核' },
  children: [
    {
      path: 'list',
      name: 'WorkAllotList',
      component: () => import('@/views/personnel/work-allot/list'),
      meta: { title: '列表', noCache: true, activeMenu: '/personnel/work-allot' },
      hidden: true
    },
    {
      path: 'create',
      name: 'WorkAllotCreate',
      component: () => import('@/views/personnel/work-allot/create'),
      meta: { title: '添加考核', noCache: true, activeMenu: '/personnel/work-allot' },
      hidden: true
    },
    {
      path: 'edit/:id(\\w+)',
      name: 'WorkAllotEdit',
      component: () => import('@/views/personnel/work-allot/edit'),
      meta: { title: '编辑考核', noCache: true, activeMenu: '/personnel/work-allot' },
      hidden: true
    },
    {
      path: 'detail/:id(\\w+)',
      name: 'WorkAllotDetail',
      component: () => import('@/views/personnel/work-allot/detail'),
      meta: { title: '查看考核', noCache: true, activeMenu: '/personnel/work-allot' },
      hidden: true
    }
  ]
}

export default workAllotRouter
