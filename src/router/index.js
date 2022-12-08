/** Do not comment the following routes */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store'
import AuthRoutes from '../modules/auth-service/auth/routes'
import organizationProfileRoutes from '../modules/common-config/org-profile/routes'
/* Layouts */
const AuthSignUpLayout = () => import('../layouts/auth-layouts/AuthSignupLayout.vue')
const NotFoundPage = () => import('../views/Pages/ErrorPage.vue')

Vue.use(VueRouter)

const childRoutes = (prop) => [
 {
    path: '/home',
    // name: prop + '.home-2',
    // meta: { auth: true, name: 'Home 2' },
    // component: Dashboard2,
    redirect: { name: 'authSignUp.dashboard' }
  }
]

const defaultRoutes = [
  {
    path: '',
    name: 'dashboard',
    component: AuthSignUpLayout,
    meta: { auth: true },
    children: childRoutes('dashboard')
  },
  {
    path: '/error-page/:code?',
    meta: { auth: false },
    props: true,
    component: NotFoundPage
  },
  {
      path: '*',
      meta: { auth: false },
      component: NotFoundPage
  }
]

const routes = [
  ...defaultRoutes,
  ...AuthRoutes,
  ...organizationProfileRoutes
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    const accessToken = Store.state.Auth.accessToken
    const authUser = Store.state.Auth.authUser

    if (!accessToken && authUser) {
      return next({ path: '/auth/login' })
    } else if (!accessToken && !authUser) {
      return next({ path: '/auth/login' })
    } else {
      return next()
    }
    // if (accessToken && authUser) {
    //     return next()
    // }
    // return next({ path: '/auth/login' })
  }

  next()
})

export default router
