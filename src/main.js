import '@babel/polyfill'
import Vue from 'vue'
import 'mutationobserver-shim'
import './Utils/fliter'
import App from './App.vue'
import router from './router'
import store from './store'
import Raphael from 'raphael/raphael'
// import VueSocketIO from 'vue-socket.io'
// import getPushNotification from './Utils/push-notification'
import './plugins'
// import './registerServiceWorker'
import i18n from './i18n'
import './directives'
import CxltToastr from 'cxlt-vue2-toastr'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674'
}
Vue.use(VueSweetalert2, options)
// install rules
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

global.Raphael = Raphael

// Toastr config
const toastrConfigs = {
  position: 'top right',
  errorColor: '#D6E09B',
  warningColor: '#D6E09B',
  showDuration: 1000,
  timeOut: 3000
}

Vue.use(CxltToastr, toastrConfigs)
// end of Toastr config

Vue.config.productionTip = false

/** For custom font */
Vue.prototype.$fontFamily = ''

/** socket base path added */
// Vue.use(new VueSocketIO({
//   debug: true,
//   // connection: 'https://syn-node-notification.herokuapp.com/',
//   connection: 'http://134.119.217.113:8090/',
//     vuex: {
//       // store,
//       actionPrefix: 'SOCKET_'
//     },
//     options: { }
// }))

// const getNotification = {
//   pushNotification: function (data) {
//     getPushNotification(data)
//   }
// }

window.addEventListener('storage', function (event) {
  if (event.key === 'logout') {
    window.location.reload()
  }
}, false)

const vm = new Vue({
  router,
  store,
  i18n,
  // sockets: getNotification,
  render: h => h(App)
}).$mount('#app')

window.vm = vm
