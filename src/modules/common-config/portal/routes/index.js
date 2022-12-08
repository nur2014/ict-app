const childRoutes = (prop) => [
  {
    path: 'service-category',
    name: 'service-category',
    meta: { auth: true, name: 'Editable' },
    component: () => ''
  }
]
const routes = [
  {
    path: '/portal-service',
    name: 'Portal',
    component: () => import('../../../../layouts/VerticleLayout.vue'),
    meta: { auth: true },
    children: childRoutes('portal-service')
  }
]

export default routes
