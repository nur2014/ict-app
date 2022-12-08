import Store from '../../../../store'

const authSignupRoutes = (prop) => [
  {
    path: 'sign-up',
    name: prop + '.sign_up',
    meta: { auth: false },
    component: () => ''
  },
  {
    path: 'error',
    name: prop + '.error',
    meta: { auth: false },
    component: () => import('../pages/Error.vue')
  }
]
const authChildRoutes = (prop) => [
  {
    path: 'login',
    name: prop + '.login',
    meta: { auth: false },
    component: () => import('../pages/Login.vue'),
    beforeEnter: async (to, from, next) => {
      const isLoggedIn = Store.state.Auth.authUser
      const accessToken = Store.state.Auth.accessToken

      if (isLoggedIn && isLoggedIn.office_detail && accessToken) {
          return next('/auth/dashboard')
      } else if (isLoggedIn && !isLoggedIn.office_detail && accessToken) {
          return next('/common-service/dashboard')
      } else {
        next()
      }
    }
  },
  {
    path: 'e-registration',
    name: prop + '.e_registration',
    meta: { auth: false },
    component: () => ''
  }
]
const authAdminRoutes = (prop) => [
  {
    path: 'role-select',
    name: prop + '.role_select',
    meta: { auth: false },
    component: () => import('../pages/RoleSelect.vue')
  },
  {
    path: 'switch-role',
    name: prop + '.switch_role',
    meta: { auth: false },
    component: () => import('../pages/SwitchRole.vue')
  },
  {
    path: 'dashboard',
    name: prop + '.dashboard',
    meta: { auth: true },
    props: true,
    component: () => import('../pages/Dashboard.vue')
  }
]
const routes = [
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/layouts/auth-layouts/AuthLayout'),
    meta: { auth: false },
    children: authChildRoutes('auth')
  },
  {
    path: '/auth',
    name: 'authSignUp',
    component: () => import('@/layouts/auth-layouts/AuthSignupLayout'),
    meta: { auth: false },
    children: authSignupRoutes('authSignUp'),
    beforeEnter: async (to, from, next) => {
      const isLoggedIn = Store.state.Auth.authUser
      const accessToken = Store.state.Auth.accessToken

      if (isLoggedIn && isLoggedIn.office_detail && accessToken) {
          return next('/auth/dashboard')
      } else if (isLoggedIn && !isLoggedIn.office_detail && accessToken) {
          return next('/common/dashboard')
      } else {
        next()
      }
    }
  },
  {
    path: '/auth',
    name: 'authSignUp',
    component: () => import('@/layouts/auth-layouts/AuthAdminLayout'),
    meta: { auth: false },
    children: authAdminRoutes('authSignUp')
  }
]

export default routes
