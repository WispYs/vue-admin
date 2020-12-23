const shipmentCompleteRouter = {
  path: 'shipment-complete',
  name: 'ShipmentComplete',
  redirect: '/project/implplan/shipment-complete/list',
  component: () => import('@/views/project/implplan/shipment-complete/index'),
  meta: { title: '已发货项目' },
  children: [
    {
      path: 'list',
      name: 'ShipmentCompleteList',
      component: () => import('@/views/project/implplan/shipment-complete/list'),
      meta: { title: '列表', noCache: true, activeMenu: '/project/implplan/shipment-complete' },
      hidden: true
    },
    {
      path: 'detail/:id(\\w+)',
      name: 'ShipmentCompleteDetail',
      component: () => import('@/views/project/implplan/shipment-complete/detail'),
      meta: { title: '查看项目', noCache: true, activeMenu: '/project/implplan/shipment-complete' },
      hidden: true
    }
  ]
}

export default shipmentCompleteRouter
