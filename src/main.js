import Vue from 'vue'
import VueGtag from "vue-gtag"
import VueApexCharts from 'vue-apexcharts'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import i18n from './i18n'

Vue.config.productionTip = false

// add google analytics
Vue.use(VueGtag, {
  config: { id: "G-Q3G17MHEV6" }
}, router)

// add vue-apexcharts
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
