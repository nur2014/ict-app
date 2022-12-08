import Store from '@/store'

export const getOrgByUserPriviledge = () => {
  const authUser = Store.state.Auth.authUser
  const activeRoleId = Store.state.Auth.activeRoleId
  if (authUser === null) {
    return 0
  }
  if (activeRoleId === 1 || authUser.org_id === 1) {
    return 0
  }
  if (authUser.is_org_admin === 1) {
    return authUser.org_id
  }
  return authUser.org_id
}
export const getOfficeByUserPriviledge = () => {
  const authUser = Store.state.Auth.authUser
  const activeRoleId = Store.state.Auth.activeRoleId
  const officeObj = {
    officeId: 0,
    officeTypeId: 0
  }
  if (authUser === null) {
    return officeObj
  }
  if (activeRoleId === 1 || authUser.org_id === 1) {
    return officeObj
  }
  if (authUser.is_org_admin === 1) {
    return officeObj
  }
  officeObj.officeId = authUser.office_id
  officeObj.officeTypeId = authUser.office_type_id
  return officeObj
}
export const orgFilteredList = (orgCompList, componentId) => {
  const authUser = Store.state.Auth.authUser
  const activeRoleId = Store.state.Auth.activeRoleId
  if (activeRoleId === 1 || authUser.org_id === 1) {
    return orgCompList.filter(item => item.component_id === componentId)
  }
  if (componentId === 10 && authUser.org_id === 12) {
    return orgCompList.filter(item => item.component_id === componentId)
  }
  return orgCompList.filter(item => (item.component_id === componentId) && (item.org_id === authUser.org_id))
}
export const setFilters = () => {
  const authUser = Store.state.Auth.authUser
  const activeRoleId = Store.state.Auth.activeRoleId
  const filters = {
    hasFilterOrg: 0,
    hasFilterOffice: 0,
    hasFilterCreatedBy: 0
  }
  if (authUser === null) {
    return filters
  }
  if (activeRoleId === 1 || authUser.org_id === 1) {
    return filters
  }
  if (authUser.is_org_admin === 1) {
    filters.hasFilterOrg = authUser.org_id
    return filters
  }
  filters.hasFilterOffice = authUser.office_id
  filters.hasFilterCreatedBy = authUser.user_id
  return filters
}
