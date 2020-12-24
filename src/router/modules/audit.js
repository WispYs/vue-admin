const auditRouter = {
  path: 'audit',
  name: 'Audit',
  redirect: '/account/audit/list',
  component: () => import('@/views/account/audit/index'),
  meta: { title: '账号审核' },
  children: [
    {
      path: 'list',
      name: 'AuditList',
      component: () => import('@/views/account/audit/list'),
      meta: { title: '列表', noCache: true, activeMenu: '/account/audit' },
      hidden: true
    },
    {
      path: 'create',
      name: 'AuditCreate',
      component: () => import('@/views/account/audit/create'),
      meta: { title: '添加', noCache: true, activeMenu: '/account/audit' },
      hidden: true
    },
    {
      path: 'edit/:id(\\w+)',
      name: 'AuditEdit',
      component: () => import('@/views/account/audit/edit'),
      meta: { title: '审核', noCache: true, activeMenu: '/account/audit' },
      hidden: true
    },
    {
      path: 'detail/:id(\\w+)',
      name: 'AuditDetail',
      component: () => import('@/views/account/audit/detail'),
      meta: { title: '查看', noCache: true, activeMenu: '/account/audit' },
      hidden: true
    }
  ]
}

export default auditRouter
