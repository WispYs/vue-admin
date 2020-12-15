const personInfoRouter = {
  path: 'person-info',
  name: 'PersonInfo',
  redirect: '/personnel/person-info/list',
  component: () => import('@/views/personnel/person-info/index'),
  meta: { title: '员工信息' },
  children: [
    {
      path: 'list',
      name: 'PersonInfoList',
      component: () => import('@/views/personnel/person-info/list'),
      meta: { title: '列表', noCache: true, activeMenu: '/personnel/person-info' },
      hidden: true
    },
    {
      path: 'create',
      name: 'PersonInfoCreate',
      component: () => import('@/views/personnel/person-info/create'),
      meta: { title: '添加', noCache: true, activeMenu: '/personnel/person-info' },
      hidden: true
    },
    {
      path: 'edit/:id(\\w+)',
      name: 'PersonInfoEdit',
      component: () => import('@/views/personnel/person-info/edit'),
      meta: { title: '编辑', noCache: true, activeMenu: '/personnel/person-info' },
      hidden: true
    },
    {
      path: 'detail/:id(\\w+)',
      name: 'PersonInfoDetail',
      component: () => import('@/views/personnel/person-info/detail'),
      meta: { title: '查看', noCache: true, activeMenu: '/personnel/person-info' },
      hidden: true
    }
  ]
}

export default personInfoRouter
