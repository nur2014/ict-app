const authSignupRoutes = (prop) => [
  {
    path: 'home',
    name: prop + '.home',
    meta: { auth: false },
    component: () => import('../pages/Home.vue')
  },
  {
    path: 'services',
    name: prop + '.services',
    meta: { auth: false },
    component: () => import('../pages/Services.vue')
  },
  {
    path: 'service-details',
    name: prop + '.service_details',
    meta: { auth: false },
    component: () => import('../pages/ServiceDetails.vue')
  },
  {
    path: 'about-service-portal',
    name: prop + '.about_service_portal',
    meta: { auth: false },
    component: () => import('../pages/AboutPortal.vue')
  },
  {
    path: 'all-services',
    name: prop + '.all_services',
    meta: { auth: false },
    component: () => import('../pages/AllServices.vue')
  },
  {
    path: 'faq',
    name: prop + '.faq',
    meta: { auth: false },
    component: () => import('../pages/FAQ.vue')
  },
  {
    path: 'notice',
    name: prop + '.notice',
    meta: { auth: false },
    component: () => import('../pages/Notice.vue')
  },
  {
    path: 'news',
    name: prop + '.news',
    meta: { auth: false },
    component: () => import('../pages/News.vue')
  },
  {
    path: 'news-details/:id',
    name: prop + '.news_details',
    meta: { auth: false },
    component: () => import('../pages/NewsDetails.vue')
  },
  {
    path: 'policy',
    name: prop + '.policy',
    meta: { auth: false },
    component: () => import('../pages/Policy.vue')
  },
  {
    path: 'terms',
    name: prop + '.terms',
    meta: { auth: false },
    component: () => import('../pages/Terms.vue')
  },
  {
    path: 'subsidy-circular-list',
    name: prop + '.circular_list',
    meta: { auth: false },
    props: true,
    component: () => import('../pages/subsidy-circular/List.vue')
  },
  {
    path: 'venue-reservation',
    name: prop + '.venue_reservation',
    meta: { auth: false },
    props: true,
    component: () => import('../pages/venue-reservation/List.vue')
  },
  {
    path: 'research-proposal-circular-list',
    name: prop + '.venue_reservation',
    meta: { auth: false },
    props: true,
    component: () => import('../pages/research-proposal-circular-list/List.vue')
  },
  {
    path: 'boro-import-application',
    redirect: { path: '/portal/service-details', query: { service_type: 'orgList', org_id: 1, service_id: 86 } }
  },
  {
    path: 'seed-dealer-registration',
    redirect: { path: '/portal/service-details', query: { service_type: 'orgList', org_id: 1, service_id: 80 } }
  },
  {
    path: 'crop-seed-import-registration',
    redirect: { path: '/portal/service-details', query: { service_type: 'orgList', org_id: 1, service_id: 79 } }
  },
  {
    path: 'crop-seed-export-registration',
    redirect: { path: '/portal/service-details', query: { service_type: 'orgList', org_id: 1, service_id: 83 } }
  },
  {
    path: 'crop-variety-registration',
    redirect: { path: '/portal/service-details', query: { service_type: 'orgList', org_id: 1, service_id: 78 } }
  }
]
const publicationRoutes = (prop) => [
  {
    path: 'magazine',
    name: prop + '.magazine',
    meta: { auth: false },
    component: () => import('../pages/publication-management/Magazine.vue')
  },
  {
    path: 'magazine-details',
    name: prop + '.magazine-details',
    meta: { auth: false },
    component: () => import('../pages/publication-management/MagazineDetails.vue')
  },
  {
    path: 'content-details',
    name: prop + '.content-details',
    meta: { auth: false },
    component: () => import('../pages/publication-management/ContentDetails.vue')
  },
  {
    path: 'research-report-details',
    name: prop + '.research-report-details',
    meta: { auth: false },
    component: () => import('../pages/publication-management/ResearchReportDetails.vue')
  },
  {
    path: '/',
    name: prop + '.common',
    meta: { auth: false },
    component: () => import('../pages/publication-management/Common.vue')
  },
  {
    path: 'publication-circular-list',
    name: prop + '.publication_circular_list',
    meta: { auth: false },
    props: true,
    component: () => import('../pages/publication-management/circular/List.vue')
  },
  {
    path: 'research-circular-list',
    name: prop + '.research_circular_list',
    meta: { auth: false },
    props: true,
    component: () => import('../pages/publication-management/research-circular/List.vue')
  }
]
const training = (prop) => [
  {
    path: 'training-circular-list',
    name: prop + '.training_circular_list',
    meta: { auth: false },
    component: () => import('../pages/training-circular-list/List.vue')
  }
]
const marketDirectory = (prop) => [
    {
        path: 'market-directory-report',
        name: prop + '.market-directory-report',
        meta: { auth: false },
        component: () => import('../pages/market-directory/market-directory-report/List.vue')
    },
    {
        path: 'market-daily-price-report',
        name: prop + '.market_daily_price_report',
        meta: { auth: false },
        component: () => import('../pages/market-directory/market-daily-price-report/List.vue')
    },
    {
        path: 'product-wise-market-price-report',
        name: prop + '.product_wise_market_price_report',
        meta: { auth: false },
        component: () => import('../pages/market-directory/product-wise-market-price-report/List.vue')
    },
    {
        path: 'weekly-market-wise-price-report',
        name: prop + '.weekly_market_wise_price_report',
        meta: { auth: false },
        component: () => import('../pages/market-directory/weekly-market-wise-price-report/List.vue')
    },
    {
        path: 'yearly-average-market-price-report',
        name: prop + '.yearly_average_market_price_report',
        meta: { auth: false },
        component: () => import('../pages/market-directory/yearly-average-market-price-report/List.vue')
    },
    {
        path: 'mothly-average-market-price-report',
        name: prop + '.mothly_average_market_price_report',
        meta: { auth: false },
        component: () => import('../pages/market-directory/mothly-average-market-price-report/List.vue')
    },
    {
        path: 'weekly-average-price-report',
        name: prop + '.weekly_average_price_report',
        meta: { auth: false },
        component: () => import('../pages/market-directory/weekly-average-price-report/List.vue')
    },
    {
        path: 'division-wise-average-market-price-report',
        name: prop + '.division_wise-average_market_price_report',
        meta: { auth: false },
        component: () => import('../pages/market-directory/division-wise-average-market-price-report/List.vue')
    },
    {
        path: 'grower-avg-price-report',
        name: prop + '.grower_avg_price_report',
        meta: { auth: false },
        component: () => import('../pages/market-directory/grower-avg-price-report/List.vue')
    },
    {
        path: 'comparative-market-price',
        name: prop + '.comparative_market_price',
        meta: { auth: false },
        component: () => import('../pages/market-directory/comparative-market-price/List.vue')
    },
    {
        path: 'price-graphical-report',
        name: prop + '.price_graphical_report',
        meta: { auth: false },
        component: () => import('../pages/market-directory/price-graphical-report/List.vue')
    }
]

const routes = [
  {
    path: '/portal',
    name: 'portal',
    component: () => import('@/layouts/auth-layouts/PortalLayout'),
    meta: { auth: false },
    children: authSignupRoutes('portal')
  },
  {
    path: '/market-directory',
    name: 'external_user.market_directory',
    component: () => import('@/layouts/auth-layouts/PortalLayoutDam'),
    meta: { auth: false },
    children: marketDirectory('external_user.market_directory')
  },
  {
    path: '/portal/publication',
    name: 'portal.publication',
    component: () => import('@/layouts/auth-layouts/PortalLayout'),
    meta: { auth: false },
    children: publicationRoutes('portal.publication')
  },
  {
    path: '/training',
    name: 'external_user.training',
    component: () => import('@/layouts/auth-layouts/PortalLayoutTrain'),
    meta: { auth: false },
    children: training('external_user.training')
  }
]

export default routes
