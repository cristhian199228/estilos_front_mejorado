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
  store.commit("SHOW_NAVIGATION_DRAWER", true);
  store.commit("SET_MOSTRAR_NAV_ICON", true);
  store.commit("SET_BACKGROUND", "logueado");
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
