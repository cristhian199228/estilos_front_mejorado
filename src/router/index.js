import Vue from 'vue'
import VueRouter from 'vue-router'
import InicioContainer from '../components/inicio/InicioContainer'
import FotoContainer from '../components/fotos/FotoContainer'
import PromocionContainer from '../components/promocion/PromocionContainer'
/* import store from "../store"; */

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import('../components/LoginForm')
  },
  {
    path: '/',
    component: InicioContainer
  },
  {
    path: '/inicio',
    component: InicioContainer
  },
  {
    path: '/fotos',
    component: FotoContainer
  },
  {
    path: '/promocion',
    component: PromocionContainer
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !window.localStorage.getItem('user')) next('/login')
  else next()
})

export default router