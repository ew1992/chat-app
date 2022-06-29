import Vue from 'vue'
import App from './App.vue'
import './plugins/firebase'
import vuetify from './plugins/vuetify'
import "vuetify/dist/vuetify.min.css"
import '@mdi/font/css/materialdesignicons.css'
import router from './plugins/router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "./css/style.css";

Vue.config.productionTip = false
Vue.use(vuetify)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
