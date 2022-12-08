import Vue from 'vue'
import BootstrapVue, { ModalPlugin } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(ModalPlugin, { BModal: { hideFooter: true } })
Vue.use(BootstrapVue)
