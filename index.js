/** Do not comment the following routes */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store'
import PortalRoutes from '../modules/portal/routes'
import AuthRoutes from '../modules/auth-service/auth/routes'
import UserManagementRoutes from '../modules/auth-service/user-management/routes'
import organizationProfileRoutes from '../modules/common-config/org-profile/routes'
import organogramRoutes from '../modules/common-config/organogram/routes'
import complainRoutes from '../modules/common-config/complain/routes'
import notificationRoutes from '../modules/common-config/notification/routes'
import paymentManagementRoutes from '../modules/common-config/payment-management/routes'
import documentRoutes from '../modules/common-config/document/routes'
import dataArchiveRoutes from '../modules/common-config/data-archive/routes'
import CommitteeRoutes from '../modules/common-config/committee/routes'
import infoServiceManagementRoutes from '../modules/common-config/info-service-management/routes'
/** Irrigation scheme Service */
// import IrrigationSchemConfigurationRoutes from '../modules/irrigation-scheme-service/configuration/routes'
// import IrrigationSchemeTaskRoutes from '../modules/irrigation-scheme-service/task/routes'
// import IrrigationSchemeWaterTestingRoutes from '../modules/irrigation-scheme-service/water-testing/routes'
// import IrrigationPumpInformationRoutes from '../modules/irrigation-scheme-service/pump-information/routes'
// import pumpInstallation from '../modules/irrigation-scheme-service/pump-installation/routes'
// import pumpMaintenance from '../modules/irrigation-scheme-service/pump-maintenance/routes'
// import farmerOperatorPanel from '../modules/irrigation-scheme-service/farmer-operator-panel/routes'
// import cardPaymentRoutes from '../modules/irrigation-scheme-service/card-payment/routes'
/** Warehouse Service */
// import WarehouseConfigRoutes from '../modules/warehouse-service/configuration/routes'
// import WarehouseInfoRoutes from '../modules/warehouse-service/information/routes'
// import WarehouseServiceRoutes from '../modules/warehouse-service/ware-service/routes'
// import WarehouseReportRoutes from '../modules/warehouse-service/report/routes'
// import WarehouseServicePerformanceRoutes from '../modules/warehouse-service/service-performance/routes'
// import WarehouseInfoServiceRoutes from '../modules/warehouse-service/info-service/routes'
// import WarehouseWarehouseManagementRoutes from '../modules/warehouse-service/warehouse-management/routes'
/** Seeds Fertilizer Service */
// import seedsConfigRoutes from '../modules/seeds-fertilizer-service/seeds/configuration/routes'
// import fertilizerConfigRoutes from '../modules/seeds-fertilizer-service/fertilizer/configuration/routes'
// import fertilizerProcurementRoutes from '../modules/seeds-fertilizer-service/fertilizer/procurement/routes'
// import seedsSeedsRoutes from '../modules/seeds-fertilizer-service/seeds/seeds-seeds/routes'
// import seedsApplicationAllocationRoutes from '../modules/seeds-fertilizer-service/seeds/application-allocation/routes'
// import seedsReportRoutes from '../modules/seeds-fertilizer-service/seeds/seeds-reports/routes'
// import fertilizerMovementRoutes from '../modules/seeds-fertilizer-service/fertilizer/movement/routes'
// import fertilizerRoutes from '../modules/seeds-fertilizer-service/fertilizer/fertilizer-reports/routes'
// import fertilizerSalesRoutes from '../modules/seeds-fertilizer-service/fertilizer/sales/routes'
// import fertilizerDealerManagementRoutes from '../modules/seeds-fertilizer-service/fertilizer/dealer-management/routes'
// import seedsFerGermPlasmConfigurationRoutes from '../modules/seeds-fertilizer-service/germplasm/configuration/routes'
// import seedsFerReportRoutes from '../modules/seeds-fertilizer-service/germplasm/report/routes'
// import seedsFerGermPlasmGermPlasmRoutes from '../modules/seeds-fertilizer-service/germplasm/germplasm/routes'
/** Agri Marketing service */
// import agriMarketingMasterRoutes from '../modules/agri-marketing/master/routes'
// import agriMarketingCottonConfigRoutes from '../modules/agri-marketing/cotton/configuration/routes'
// import agriMarketingCropPriceInfoConfigRoutes from '../modules/agri-marketing/crop-price-info/configuration/routes'
// import agriMarketingCottonGinnerGrowerRoutes from '../modules/agri-marketing/cotton/ginner-grower/routes'
// import agriMarketingCottonReportsRoutes from '../modules/agri-marketing/cotton/reports/routes'
// import agriMarketingEPustiConfigRoutes from '../modules/agri-marketing/e-pusti/configuration/routes'
// import agriMarketingEPustiBirtanRoutes from '../modules/agri-marketing/e-pusti/birtan/routes'
// import agriMarketingPustiMappingRoutes from '../modules/agri-marketing/pusti-mapping/routes'
// import agriMarketingMarketLinkageConfigRoutes from '../modules/agri-marketing/market-linkage/config/routes'
// import agriMarketingMarketLinkageLinkageRoutes from '../modules/agri-marketing/market-linkage/linkage/routes'
// import agriMarketingMarketLinkageReportRoutes from '../modules/agri-marketing/market-linkage/report/routes'
// import agriMarketingCropPriceInfoPriceInformationRoutes from '../modules/agri-marketing/crop-price-info/price-information/routes'
// import agriMarketingCropPriceInfoReportRoutes from '../modules/agri-marketing/crop-price-info/reports/routes'
/** Incentive Grant Service Started from here **/
// import incentiveGrantMasterRoutes from '../modules/incentive-grant-service/master/routes'
// import incentiveGrantBarcConfigRoutes from '../modules/incentive-grant-service/barc/configuration/routes'
// import incentiveGrantBSRIConfigRoutes from '../modules/incentive-grant-service/bsri/configuration/routes'
// import incentiveGrantBSRIDemandDistributionRoutes from '../modules/incentive-grant-service/bsri/demand-distribution/routes'
// import incentiveGrantBSRIReportRoutes from '../modules/incentive-grant-service/bsri/reports/routes'
// import incentiveGrantDAEConfigRoutes from '../modules/incentive-grant-service/dae/configuration/routes'
// import incentiveGrantDAEGrantAllocationDistributionRoutes from '../modules/incentive-grant-service/dae/grant-allocation-distribution/routes'
// import incentiveGrantDAEpurchInventRoutes from '../modules/incentive-grant-service/dae/purchase-inventory/routes'
// import incentiveGrantDAEReportsRoutes from '../modules/incentive-grant-service/dae/reports/routes'
// import incentiveGrantDAESubsidyRoutes from '../modules/incentive-grant-service/dae/subsidy/routes'
// import incentiveGrantCommonConfigRoutes from '../modules/incentive-grant-service/common-configuration/routes'
// import incentiveGrantBarcGrantDistributionRoutes from '../modules/incentive-grant-service/barc/grant-distribution/routes'
// import incentiveGrantBarcReportRoutes from '../modules/incentive-grant-service/barc/report/routes'
// import incentiveGrantDaeAllocationRoutes from '../modules/incentive-grant-service/dae/allocation/routes'
// import incentiveGrantDaeFinalcialAidRoutes from '../modules/incentive-grant-service/dae/financial-aid/routes'
/** Training E Learning service */
// import trainingElearningConfigRoutes from '../modules/training-e-learning-service/configuration/routes'
// import trainingElearningAccommodationRoutes from '../modules/training-e-learning-service/accommodation-management/routes'
// import trainingElearningIabmRoutes from '../modules/training-e-learning-service/iabm/routes'
// import trainingElearningTpmRoutes from '../modules/training-e-learning-service/tpm/routes'
// import trainingElearningVenueRoutes from '../modules/training-e-learning-service/venue/routes'
// import trainingElearningReportRoutes from '../modules/training-e-learning-service/report/routes'
// import trainingElearningManagementRoutes from '../modules/training-e-learning-service/elearning-management/routes'
// import trainingElearningTimRoutes from '../modules/training-e-learning-service/tim/routes'
/** Virtual Museum Service */
// import VirtualMuseumConfigurationRoutes from '../modules/virtual-museum-service/configuration/routes'
// import VirtualMuseumManagementRoutes from '../modules/virtual-museum-service/museum-information-management/routes'
// import VirtualSoilManagementRoutes from '../modules/virtual-museum-service/soil-management-system/routes'
// import VirtualMuseumPestManagementRoutes from '../modules/virtual-museum-service/pest-management/routes'
// import VirtualContentManagementRoutes from '../modules/virtual-museum-service/content-management-system/routes'
// import VirtualTourManagementRoutes from '../modules/virtual-museum-service/tour-management/routes'
/** Licence & Registration Routes **/
// import licenseRegistrationConfigRoutes from '../modules/license-registration-service/configuration/routes'
// import licenseRegistrationStepRoutes from '../modules/license-registration-service/license-step/routes'
// import ExternalUserLrcpnRoutes from '../modules/external-user-service/lrcpn/routes'
/** Agri Research Management */
// import agriTestingServiceRoutes from '../modules/agri-research/testing-service/routes'
// import agriSeedCertificationRoutes from '../modules/agri-research/seed-certification/routes'
// import ExternalUserResearchRoutes from '../modules/external-user-service/agri-research/routes'
// import agriResearchManagementRoutes from '../modules/agri-research/research-management/routes'
// import agriResearchNcdbRoutes from '../modules/agri-research/national-crop-data-bank/routes'
// import agriPublicationManagementRoutes from '../modules/agri-research/publication-management/routes'
/** Do not comment the follwoing Routes */
import ExternalUserTrainingRoutes from '../modules/external-user-service/training/routes'
import ExternalIncentiveFarmerRoutes from '../modules/external-user-service/incentive/routes'
import ExternalUserIrrigationRoutes from '../modules/external-user-service/irrigation/routes'
/** Portal Routes */
import CommonPortalRoutes from '../modules/common-config/portal/routes'

/* Layouts */
const AuthSignUpLayout = () => import('../layouts/auth-layouts/AuthSignupLayout.vue')
const NotFoundPage = () => import('../views/Pages/ErrorPage.vue')

Vue.use(VueRouter)

const childRoutes = (prop) => [
  {
    path: '',
    // name: prop + '.home-2',
    // meta: { auth: true, name: 'Home 2' },
    // component: Dashboard2,
    redirect: { name: 'portal.home' }
  },
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
    path: '/seeds-fertilizer-service',
    name: 'seeds_fertilizer_service',
    component: () => import('@/layouts/SeedsFertilizerLayout'),
    meta: { auth: true },
    children: [
      {
        path: 'dashboard',
        // redirect: { name: 'seeds_fertilizer_service.fertilizer-config.dashboard' }
        name: 'seeds_fertilizer_service.dashboard',
        component: () => import('@/views/services-main-dashboard/SeedsFertilizer.vue')
      }
    ]
  },
  {
    path: '/training-e-learning-service',
    name: 'training_e_learning_service',
    component: () => import('@/layouts/TrainingElearningLayout'),
    meta: { auth: true },
    children: [
      {
        path: 'dashboard',
        name: 'training_e_learning_service.dashboard',
        component: () => import('@/views/services-main-dashboard/trainingElearning.vue')
      }
    ]
  },
  {
    path: '/virtual-museum-service',
    name: 'virtual_museum_service',
    component: () => import('@/layouts/VirtualMuseumLayout'),
    meta: { auth: true },
    children: [
      {
        path: 'dashboard',
        name: 'virtual_museum_service.dashboard',
        component: () => import('@/views/services-main-dashboard/VirtualMuseum.vue')
      }
    ]
  },
  {
    path: '/agri-research-service',
    name: 'agri_research_service',
    component: () => import('@/layouts/AgriResearchLayout'),
    meta: { auth: true },
    children: [
      {
        path: 'dashboard',
        name: 'agri_research_service.dashboard',
        component: () => import('@/views/services-main-dashboard/AgriResearch.vue')
      }
    ]
  },
  {
    path: '/license-registration-service',
    name: 'license_registration_service',
    component: () => import('@/layouts/LicenseRegistrationLayout'),
    meta: { auth: true },
    children: [
      {
        path: 'dashboard',
        name: 'license_registration_service.dashboard',
        component: () => import('@/views/services-main-dashboard/LicenseRegistration.vue')
      }
    ]
  },
  {
      path: '*',
      meta: { auth: false },
      component: NotFoundPage
  }
]

const routes = [
  ...defaultRoutes,
  ...PortalRoutes,
  ...AuthRoutes,
  ...UserManagementRoutes,
  ...organizationProfileRoutes,
  ...organogramRoutes,
  ...complainRoutes,
  ...notificationRoutes,
  ...paymentManagementRoutes,
  ...documentRoutes,
  ...dataArchiveRoutes,
  ...CommitteeRoutes,
  ...infoServiceManagementRoutes,
  /** Irrigation Scheme */
  // ...IrrigationSchemConfigurationRoutes,
  // ...IrrigationSchemeTaskRoutes,
  // ...IrrigationSchemeWaterTestingRoutes,
  // ...pumpInstallation,
  // ...farmerOperatorPanel,
  // ...IrrigationPumpInformationRoutes,
  // ...cardPaymentRoutes,
  // ...pumpMaintenance,
  /** Warehouse routes */
  // ...WarehouseConfigRoutes,
  // ...WarehouseInfoRoutes,
  // ...WarehouseServiceRoutes,
  // ...WarehouseReportRoutes,
  // ...WarehouseServicePerformanceRoutes,
  // ...WarehouseInfoServiceRoutes,
  // ...WarehouseWarehouseManagementRoutes,
  /** Seeds fertilizer */
  // ...seedsConfigRoutes,
  // ...fertilizerConfigRoutes,
  // ...fertilizerProcurementRoutes,
  // ...seedsSeedsRoutes,
  // ...seedsApplicationAllocationRoutes,
  // ...seedsReportRoutes,
  // ...fertilizerMovementRoutes,
  // ...fertilizerRoutes,
  // ...fertilizerSalesRoutes,
  // ...fertilizerDealerManagementRoutes,
  // ...seedsFerGermPlasmConfigurationRoutes,
  // ...seedsFerReportRoutes,
  // ...seedsFerGermPlasmGermPlasmRoutes,
  /** Agri Marketing Routes */
  // ...agriMarketingMasterRoutes,
  // ...agriMarketingCottonConfigRoutes,
  // ...agriMarketingCottonReportsRoutes,
  // ...agriMarketingEPustiConfigRoutes,
  // ...agriMarketingEPustiBirtanRoutes,
  // ...agriMarketingCropPriceInfoConfigRoutes,
  // ...agriMarketingCottonGinnerGrowerRoutes,
  // ...agriMarketingPustiMappingRoutes,
  // ...agriMarketingMarketLinkageConfigRoutes,
  // ...agriMarketingMarketLinkageLinkageRoutes,
  // ...agriMarketingMarketLinkageReportRoutes,
  // ...agriMarketingCropPriceInfoPriceInformationRoutes,
  // ...agriMarketingCropPriceInfoReportRoutes,
  /** Incentive */
  // ...incentiveGrantMasterRoutes,
  // ...incentiveGrantBarcConfigRoutes,
  // ...incentiveGrantBSRIConfigRoutes,
  // ...incentiveGrantBSRIDemandDistributionRoutes,
  // ...incentiveGrantBSRIReportRoutes,
  // ...incentiveGrantDAEConfigRoutes,
  // ...incentiveGrantDAEGrantAllocationDistributionRoutes,
  // ...incentiveGrantDAEpurchInventRoutes,
  // ...incentiveGrantDAEReportsRoutes,
  // ...incentiveGrantDAESubsidyRoutes,
  // ...incentiveGrantBarcGrantDistributionRoutes,
  // ...incentiveGrantBarcReportRoutes,
  // ...incentiveGrantCommonConfigRoutes,
  // ...incentiveGrantDaeAllocationRoutes,
  // ...incentiveGrantDaeFinalcialAidRoutes,
  /** Training routes */
  // ...trainingElearningConfigRoutes,
  // ...trainingElearningAccommodationRoutes,
  // ...trainingElearningIabmRoutes,
  // ...trainingElearningTpmRoutes,
  // ...trainingElearningVenueRoutes,
  // ...trainingElearningReportRoutes,
  // ...trainingElearningTimRoutes,
  // ...trainingElearningManagementRoutes,
  /** Virtual Museum Routes */
  // ...VirtualMuseumConfigurationRoutes,
  // ...VirtualMuseumManagementRoutes,
  // ...VirtualSoilManagementRoutes,
  // ...VirtualMuseumPestManagementRoutes,
  // ...VirtualContentManagementRoutes,
  // ...VirtualTourManagementRoutes,
  /** Licence & Registration Routes **/
  // ...licenseRegistrationConfigRoutes,
  // ...licenseRegistrationStepRoutes,
  // ...ExternalUserLrcpnRoutes,
  /** Agri Research routes */
  // ...agriSeedCertificationRoutes,
  // ...agriResearchManagementRoutes,
  // ...ExternalUserResearchRoutes,
  // ...agriTestingServiceRoutes,
  // ...agriResearchNcdbRoutes,
  // ...agriPublicationManagementRoutes,
  /** Do not comment the following routes */
  ...ExternalUserTrainingRoutes,
  ...ExternalIncentiveFarmerRoutes,
  ...ExternalUserIrrigationRoutes,
  ...CommonPortalRoutes
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
    if (accessToken && authUser) {
        return next()
    }

    return next({ path: '/auth/login' })
  }

  next()
})

export default router
