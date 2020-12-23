import overviewRouter from './overview'
import notStartedRouter from './not-started'
import workingRouter from './working'
import completedRouter from './completed'
import deliveredRouter from './delivered'
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
    workingRouter,
    completedRouter,
    deliveredRouter,
    shelvedRouter
  ]
}

export default implplanRouter
