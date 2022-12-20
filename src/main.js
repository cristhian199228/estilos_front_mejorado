import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

if (window.localStorage.getItem("user") != null) {
  const user = JSON.parse(window.localStorage.getItem("user"));
  store.commit("user/SET_USER", user);
  store.commit("SET_BACKGROUND", "logueado");
}
if (window.localStorage.getItem("datos_persistentes") != null) {
  const datos = JSON.parse(window.localStorage.getItem("datos_persistentes"));
  store.commit("SET_DATOS_PERSISTENTES", datos);
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
