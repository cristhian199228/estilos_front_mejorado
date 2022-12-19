import Vue from 'vue'
import Vuex from 'vuex'
import user from "./modules/user"
import foto from "./modules/foto"
import promocion from "./modules/promocion"
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_URL

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        fondoprincipal: "landing-page",
        drawer: false,
        snackbar: {
            message: null,
            color: null,
            show: false,
        },
        mostrar_nav_icon: false,
        rubros:[],
        inicio_completado:false,
        fotos_completado:false
    },
    getters: {
        drawerState: (state) => state.drawer
    },
    mutations: {

        SET_BACKGROUND(state, background) {
            state.fondoprincipal = background
        },
        SHOW_NAVIGATION_DRAWER(state, navigation) {
            state.drawer = navigation
        },
        SET_MOSTRAR_NAV_ICON(state, valor) {
            state.mostrar_nav_icon = valor
        },
        SHOW_SUCCESS_SNACKBAR(state, message) {
            state.snackbar.color = 'success'
            state.snackbar.message = message
            state.snackbar.show = true
        },
        SHOW_ERROR_SNACKBAR(state, message) {
            state.snackbar.color = 'error'
            state.snackbar.message = message
            state.snackbar.show = true
        },
        SET_RUBROS(state, rubros) {
            state.rubros = rubros;
        },
        SET_INICIO_COMPLETADO(state,valor) {
            state.inicio_completado = valor;
        },
        SET_FOTOS_COMPLETADO(state,valor) {
            state.fotos_completado = valor;
        }
    },
    actions: {
        async getRubros({ commit }) {
            try {
                const res = await axios.get('api/getRubros');
                if (res && res.data) {
                    commit('SET_RUBROS', await res.data.data);
                }
            } catch (e) {
                console.error(e.response)
            }
        },
    },
    modules: {
        user,
        foto,
        promocion
    }
})
