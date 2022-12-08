const childRoutes = (prop) => [
  {
    path: 'cus-installment-list',
    name: 'cus-installment-list',
    meta: { auth: true, name: 'Editable' },
    component: () => import('../pages/customer-installment/List.vue')
  },
  {
    path: 'customer-list',
    name: 'customer-list',
    meta: { auth: true, name: 'Editable' },
    component: () => import('../pages/customer/List.vue')
  }
]
const settingsRoutes = (prop) => [
  {
    path: 'site-preference',
    name: prop + '.site_preference',
    meta: { auth: true },
    component: () => import('../pages/SitePreference.vue')
  }
]
const dashboardRoutes = (prop) => [
  {
    path: 'dashboard',
    name: prop + '.dashboard',
    meta: { auth: true },
    component: () => import('../pages/dashboard.vue')
  }
]
const routes = [
  {
    path: '/org-profile',
    name: 'orgProfile',
    component: () => import('../../../../layouts/VerticleLayout.vue'),
    meta: { auth: true },
    children: childRoutes('orgProfile')
  },
  {
    path: '/common-service/settings',
    name: 'common_service.settings',
    component: () => import('../../../../layouts/VerticleLayout.vue'),
    meta: { auth: true },
    children: settingsRoutes('common_service.settings')
  },
  {
    path: '/common-service',
    name: 'common_service.dashboard',
    component: () => import('../../../../layouts/VerticleLayout.vue'),
    meta: { auth: true },
    children: dashboardRoutes('common_service.dashboard')
  }
]

export default routes
