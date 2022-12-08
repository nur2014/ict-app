export default {
  userList: state => state.users,
  userFind: (state) => (id) => state.users.find(user => user.id === id),
  countryFind: (state) => (id) => state.countries.find(country => country.id === id),
  OfficeTypeFind: (state) => (id) => state.officeTypes.find(OfficeType => OfficeType.id === id),
  officeFind: (state) => (id) => state.offices.find(office => office.id === id),
  districtFind: (state) => (id) => state.districts.find(district => district.id === id),
  upazillaFind: (state) => (id) => state.upazillas.find(upazilla => upazilla.id === id),
  componentFind: (state) => (id) => state.components.find(component => component.id === id),
  serviceFind: (state) => (id) => state.services.find(service => service.id === id),
  menuFind: (state) => (id) => state.menus.find(menu => menu.id === id),
  moduleFind: (state) => (id) => state.modules.find(module => module.id === id)
}
