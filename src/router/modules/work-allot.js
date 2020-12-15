const workAllotRouter = {
  path: 'work-allot',
  name: 'WorkAllot',
  redirect: '/personnel/work-allot/list',
  component: () => import('@/views/personnel/work-allot/index'),
  meta: { title: '工作安排' },
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
      meta: { title: '新建项目', noCache: true, activeMenu: '/personnel/work-allot' },
      hidden: true
    },
    {
      path: 'edit/:id(\\w+)',
      name: 'WorkAllotEdit',
      component: () => import('@/views/personnel/work-allot/edit'),
      meta: { title: '编辑项目', noCache: true, activeMenu: '/personnel/work-allot' },
      hidden: true
    },
    {
      path: 'detail/:id(\\w+)',
      name: 'WorkAllotDetail',
      component: () => import('@/views/personnel/work-allot/detail'),
      meta: { title: '查看项目', noCache: true, activeMenu: '/personnel/work-allot' },
      hidden: true
    }
  ]
}

export default workAllotRouter
