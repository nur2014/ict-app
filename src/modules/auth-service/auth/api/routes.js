// Authentication and authorization
export const componentsByRoleApi = '/auth/components-by-role'
export const componentsOfSuperAdminApi = '/access-control/components-from-menu'
export const sidebarMenusApi = '/access-control/sidebar-menus'
// User data
export const userTypeListApi = '/external/user/user-type-list'
export const usernameCheckApi = '/external/user/check-username'
export const nothiUserCheck = '/external/nothi/user-check'
export const signUp = '/external/user/sign-up'
export const userDataApi = '/user/detail'
export const otpVerify = '/external/user/otp-verify'
export const resendOtp = '/external/user/otp-resend'
export const authUserApi = '/auth-user'
export const authUserRolesApi = '/auth/user-roles'
// Question
export const secretQuestionlist = '/secret-question/list'
export const secretQuestionStore = '/secret-question/store'
export const secretQuestionUpdate = '/secret-question/update'
export const secretQuestionToggleStatus = '/secret-question/toggle-status'
export const secretQuestionDestroy = '/secret-question/delete'
// Security
export const changePassword = '/user/change-password'
// Warehouse E-registration
export const warehouseSignUp = '/warehouseUser-registration/store'
// Forgot Password
export const forgotPasswordOtpSendApi = '/forgot-password/otp-sending'
export const forgotPasswordOtpVerifyApi = '/forgot-password/otp-verification'
export const forgotPasswordResetPasswordApi = '/forgot-password/change-password'

// ministry-dashboard routes
export const ministryDashboard = '/ministry-dashboard'
export const seedMinistryDashboard = '/seeds/ministry-dashboard/seed-dashboard'
export const ministryDashboardWarehouse = '/ministry-dashboard'
export const seedLineMinistryDashboard = '/seeds/ministry-dashboard/line-dashboard'
export const lisenceDashboardData = '/ministry/dashboard'

// movement routes
const movement = 'movement/'
export const movementList = movement + 'list'
export const movementStore = movement + 'store'
export const movementUpdate = movement + 'update'
export const movementDestroy = movement + 'destroy'
export const movementSummary = movement + 'summary'

// cropReport routes
const cropReport = 'crop/report/'
export const harvestReport = cropReport + 'harvest-report'
export const cultivateReport = cropReport + 'cultivation-report'
export const landProductionAchievementReport = cropReport + 'land-production-achievement-report'
