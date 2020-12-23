const weekplanRouter = {
  path: 'weekplan',
  name: 'Weekplan',
  redirect: '/project/weekplan/list',
  component: () => import('@/views/project/weekplan/index'),
  meta: { title: '本周计划发货项目' },
  children: [
    {
      path: 'list',
      name: 'WeekplanList',
      component: () => import('@/views/project/weekplan/list'),
      meta: { title: '列表', noCache: true, activeMenu: '/project/weekplan' },
      hidden: true
    },
    {
      path: 'detail/:id(\\w+)',
      name: 'WeekplanDetail',
      component: () => import('@/views/project/weekplan/detail'),
      meta: { title: '查看项目', noCache: true, activeMenu: '/project/weekplan' },
      hidden: true
    }
  ]
}

export default weekplanRouter
