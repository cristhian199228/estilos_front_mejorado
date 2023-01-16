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
        snackbar: {
            message: null,
            color: null,
            show: false,
        },
        rubros: [],
        ruta_foto: process.env.VUE_APP_API_URL + "/api/mostrarFoto/",
        datos_persistentes: {
            inicio: false,
            fotos: false,
            plantilla: false,
            legales: false,
            enviar: false,
            mostrar_nav_icon: false,
            drawer: false,
            foto_seleccionada: {},
            stage_json: null,
            usar_texto_establecimiento: false,
            /* legales_valores: {
                direccion: '',
                celular: '',
                horario: '',
                vigencia: '',
                restricciones: '',
                representante_legal: '',
                confirmacion_veracidad: '',
                acepta_terminos: ''
            } */
            legales_valores: {
            }
        },
    },
    getters: {
        drawerState: (state) => state.datos_persistentes.drawer,
        getRutaFoto: (state) => {
            if (state.datos_persistentes.foto_seleccionada) return state.ruta_foto + state.datos_persistentes.foto_seleccionada.ruta
        },
    },
    mutations: {
        SET_BACKGROUND(state, background) {
            state.fondoprincipal = background
        },
        SHOW_NAVIGATION_DRAWER(state, navigation) {
            state.datos_persistentes.drawer = navigation
            this.commit('SET_DATOS_PERSISTENTES', state.datos_persistentes)
        },
        SET_MOSTRAR_NAV_ICON(state, value) {
            state.datos_persistentes.mostrar_nav_icon = value
            this.commit('SET_DATOS_PERSISTENTES', state.datos_persistentes)
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
        SET_INICIO_VALIDADO(state, valor) {
            state.datos_persistentes.inicio = valor;
            this.commit('SET_DATOS_PERSISTENTES', state.datos_persistentes)
        },
        SET_FOTOS_VALIDADO(state, valor) {
            state.datos_persistentes.fotos = valor;
            this.commit('SET_DATOS_PERSISTENTES', state.datos_persistentes)
        },
        SET_PLANTILLA_VALIDADO(state, valor) {
            state.datos_persistentes.plantilla = valor;
            this.commit('SET_DATOS_PERSISTENTES', state.datos_persistentes)
        },
        SET_LEGALES_VALIDADO(state, valor) {
            state.datos_persistentes.legales = valor;
            this.commit('SET_DATOS_PERSISTENTES', state.datos_persistentes)
        },
        SET_ENVIAR_VALIDADO(state, valor) {
            state.datos_persistentes.enviar = valor;
            this.commit('SET_DATOS_PERSISTENTES', state.datos_persistentes)
        },
        SET_FOTO_SELECCIONADA(state, valor) {
            state.datos_persistentes.foto_seleccionada = valor
            this.commit('SET_DATOS_PERSISTENTES', state.datos_persistentes)
        },
        SET_STAGE_JSON(state, json) {
            state.datos_persistentes.stage_json = json
            this.commit('SET_DATOS_PERSISTENTES', state.datos_persistentes)
        },
        SET_CELULAR_LEGALES(state, legales) {
            state.datos_persistentes.legales_valores.celular = legales
            this.commit('SET_DATOS_PERSISTENTES', state.datos_persistentes)
        },
        SET_RESTRICCIONES_LEGALES(state, legales) {
            state.datos_persistentes.legales_valores.restricciones = legales
            this.commit('SET_DATOS_PERSISTENTES', state.datos_persistentes)
        },
        SET_DIRECCION_LEGALES(state, legales) {
            state.datos_persistentes.legales_valores.direccion = legales
            this.commit('SET_DATOS_PERSISTENTES', state.datos_persistentes)
        },
        SET_VIGENCIA_LEGALES(state, legales) {
            state.datos_persistentes.legales_valores.vigencia = legales
            this.commit('SET_DATOS_PERSISTENTES', state.datos_persistentes)
        },
        SET_HORARIO_LEGALES(state, legales) {
            state.datos_persistentes.legales_valores.horario = legales
            this.commit('SET_DATOS_PERSISTENTES', state.datos_persistentes)
        },
        SET_REPRESENTANTE_LEGAL_LEGALES(state, representante) {
            state.datos_persistentes.legales_valores.representante_legal = representante
            this.commit('SET_DATOS_PERSISTENTES', state.datos_persistentes)
        },
        SET_CONFIRMACION_VERACIDAD_LEGALES(state, confirmacion) {
            state.datos_persistentes.legales_valores.confirmacion_veracidad = confirmacion
            this.commit('SET_DATOS_PERSISTENTES', state.datos_persistentes)
        },
        SET_ACEPTA_TERMINOS_LEGALES(state, acepta) {
            state.datos_persistentes.legales_valores.acepta_terminos = acepta
            this.commit('SET_DATOS_PERSISTENTES', state.datos_persistentes)
        },
        SET_DATOS_PERSISTENTES(state, datos) {
            state.datos_persistentes = datos
            window.localStorage.setItem('datos_persistentes', JSON.stringify(state.datos_persistentes));
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
