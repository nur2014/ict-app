import actions from './actions'
import getters from './getters'
import { mutations } from './mutations'

const state = {
  isLoggedIn: false,
  accessToken: null,
  accessUsername: '',
  accessUserId: 0,
  userTypeList: [
    { user_type_id: 1, value: 1, user_type_name: 'Irrigation Farmer', user_type_name_bn: 'সেচ কৃষক', text: 'Irrigation Farmer' },
    { user_type_id: 2, value: 2, user_type_name: 'Warehouse Farmer', user_type_name_bn: 'গুদাম কৃষক', text: 'Warehouse Farmer' },
    { user_type_id: 6, value: 6, user_type_name: 'Dealer', user_type_name_bn: 'ডিলার', text: 'Dealer' },
    { user_type_id: 7, value: 7, user_type_name: 'Grant Applicant', user_type_name_bn: 'অনুদান আবেদনকারী', text: 'Grant Applicant' },
    { user_type_id: 8, value: 8, user_type_name: 'Trainee', user_type_name_bn: 'শিক্ষানবিস', text: 'Trainee' },
    { user_type_id: 9, value: 9, user_type_name: 'Trainer', user_type_name_bn: 'প্রশিক্ষক', text: 'Trainer' },
    { user_type_id: 10, value: 10, user_type_name: 'Incentive Farmer', user_type_name_bn: 'প্রণোদনা কৃষক', text: 'Incentive Farmer' }
  ],
  authUser: null,
  questions: [],
  authUserRoles: [],
  activeRoleId: 0,
  authorizedComponents: [],
  activeComponentId: 0,
  activeMenus: [],
  authorizedURIs: ['/home'],
  unauthorizedAccessCounter: 0
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
