import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import 'vue-awesome/icons/flag'
import 'vue-awesome/icons/home'
import 'vue-awesome/icons/arrow-up'
import 'vue-awesome/icons/arrow-down'
import 'vue-awesome/icons/arrow-left'
import 'vue-awesome/icons/arrow-right'
import 'vue-awesome/icons/play'
import 'vue-awesome/icons/backward'
import 'vue-awesome/icons/forward'
import Icon from 'vue-awesome/components/Icon'
import VueAxios from 'vue-axios'
import FamilyRoom from './components/FamilyRoom.vue'
import MasterBedroom from './components/MasterBedroom.vue'
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(Router)
Vue.component('v-icon', Icon)

Vue.config.productionTip = false

const router = new Router({
  routes: [
    {
      path: '/frm',
      name: 'FamilyRoom',
      component: FamilyRoom
    },
    {
      path: '/mbr',
      name: 'MasterBedroom',
      component: MasterBedroom
    },
    { path: '*', redirect: '/frm' }
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
