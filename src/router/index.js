import Vue from 'vue'
import VueRouter from 'vue-router'
import InicioContainer from '../components/inicio/InicioContainer'
import FotoContainer from '../components/fotos/FotoContainer'
import PromocionContainer from '../components/promocion/PromocionContainer'
import LegalesContainer from '../components/legales/LegalesContainer'
import EnviarContainer from '../components/enviar/EnviarContainer'
import EnvioSatisfactorioContainer from '../components/envio_satisfactorio/EnvioSatisfactorioContainer'
import RevisionContainer from '../components/revision/RevisionContainer'
import TablaComponent from '../components/revision/TablaComponent'
import DescargaEdicionContainer from '../components/revision/descarga/DescargaEdicionContainer'
import VistaPreviaContainer from '../components/revision/vistaprevia/DescargaEdicionContainer'
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
  },
  {
    path: '/legales',
    component: LegalesContainer
  },
  {
    path: '/enviar',
    component: EnviarContainer
  },
  {
    path: '/envio_satisfactorio',
    component: EnvioSatisfactorioContainer
  },
  {
    path: '/revision',
    component: RevisionContainer,
    children: [
      {
        path: '',
        name: 'Tabla',
        component: TablaComponent
      },
      /* {
        path: 'promocion/:promocion_id',
        name: 'Promocion',
        component: RevisionEdicionContainer
      }, */
      {
        path: 'promocion/:promocion_id',
        name: 'Promocion',
        component: VistaPreviaContainer
      },
      {
        path: 'descargapromocion/:promocion_id',
        name: 'DescargaPromocion',
        component: DescargaEdicionContainer
      },
    ],

  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !window.localStorage.getItem('user')) next('/login')
  else next()
})

export default router