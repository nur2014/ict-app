export default {
  horizontalMenuState: state => state.horizontalMenu,
  miniSidebarState: state => state.miniSidebarMenu,
  activePage: state => state.activePage,
  currentLocale: state => state.locale,
  globalSearchState: state => state.globalSearch,
  bookmarkState: state => state.bookmark,
  colorState: state => state.colors,
  darkModeState: state => state.layoutMode.dark,
  getDefaultNavbarHeight: state => state.defaultNavbarHeight,
  getMinistryPanelText: state => state.ministryPanelText
}
