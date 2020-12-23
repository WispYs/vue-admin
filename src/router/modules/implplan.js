import overviewRouter from './overview'
import notStartedRouter from './not-started'
import workshopRouter from './workshop'
import completeRouter from './complete'
import shipmentCompleteRouter from './shipment-complete'
import shelvedRouter from './shelved'
const implplanRouter = {
  path: 'implplan',
  name: 'Implplan',
  component: () => import('@/views/project/implplan/index'),
  meta: { title: '生产计划表' },
  redirect: '/project/implplan/overview',
  children: [
    overviewRouter,
    notStartedRouter,
    workshopRouter,
    completeRouter,
    shipmentCompleteRouter,
    shelvedRouter
  ]
}

export default implplanRouter
