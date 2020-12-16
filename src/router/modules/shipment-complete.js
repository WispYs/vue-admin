const shipmentCompleteRouter = {
  path: 'shipment-complete',
  name: 'ShipmentComplete',
  redirect: '/project/shipment-complete/list',
  component: () => import('@/views/project/shipment-complete/index'),
  meta: { title: '已发货项目' },
  children: [
    {
      path: 'list',
      name: 'ShipmentCompleteList',
      component: () => import('@/views/project/shipment-complete/list'),
      meta: { title: '列表', noCache: true, activeMenu: '/project/shipment-complete' },
      hidden: true
    },
    {
      path: 'create',
      name: 'ShipmentCompleteCreate',
      component: () => import('@/views/project/shipment-complete/create'),
      meta: { title: '新建项目', noCache: true, activeMenu: '/project/shipment-complete' },
      hidden: true
    },
    {
      path: 'edit/:id(\\w+)',
      name: 'ShipmentCompleteEdit',
      component: () => import('@/views/project/shipment-complete/edit'),
      meta: { title: '编辑项目', noCache: true, activeMenu: '/project/shipment-complete' },
      hidden: true
    },
    {
      path: 'detail/:id(\\w+)',
      name: 'ShipmentCompleteDetail',
      component: () => import('@/views/project/shipment-complete/detail'),
      meta: { title: '查看项目', noCache: true, activeMenu: '/project/shipment-complete' },
      hidden: true
    }
  ]
}

export default shipmentCompleteRouter
