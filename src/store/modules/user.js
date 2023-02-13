import axios from 'axios'
import router from "../../router";
axios.defaults.baseURL = process.env.VUE_APP_API_URL

const state = {
    user: null,
}

const getters = {
    getUser: state => state.user,
    getIdRubro:  state => state.user.establecimiento.rubro_id,
    getNombreComercial: state => state.user.establecimiento.nombre_comercial,
    getRutaLogo: state => process.env.VUE_APP_API_URL + '/api/mostrarLogo/' + state.user.establecimiento.ruta_logo
}

const actions = {
    async login({ commit }, params) {
        try {
            const res = await axios.post('api/login', params)
            commit('SHOW_SUCCESS_SNACKBAR', await res.data.message, { root: true })
            commit('SET_USER', await res.data.usuario)
            commit('SET_BACKGROUND', 'logueado', { root: true })
            commit('promocion/SET_TEXTO_ESTABLECIMIENTO', res.data.usuario.establecimiento.nombre_comercial, { root: true })
            await router.push('/inicio');
        } catch (e) {
            commit('SHOW_ERROR_SNACKBAR', await e.response.data.message, { root: true })
        }
    },
    async logout({ commit }) {
        await commit('LOGOUT_USER');
        commit('SET_BACKGROUND', 'landing-page', { root: true })
        commit('SET_NAVIGATION_DRAWER', false, { root: true })
        commit('SET_MOSTRAR_NAV_ICON', false, { root: true })
        const datos = {
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
            legales_valores: {
                direccion: '',
                celular: '',
                horario: '',
                vigencia: '',
                restricciones: '',
                representante_legal: '',
                confirmacion_veracidad: '',
                acepta_terminos: ''
            },
            legal_valido:false,
            enviar_valido:false,
        }
        commit('SET_DATOS_PERSISTENTES', datos, { root: true })
        router.push('/login');
    }
}

const mutations = {
    SET_USER(state, user) {
        state.user = user
        window.localStorage.setItem('user', JSON.stringify(user));
    },
    SET_RUTA_LOGO(state, ruta) {
        state.user.establecimiento.ruta_logo = ruta
        window.localStorage.setItem('user', JSON.stringify(state.user));
    },
    LOGOUT_USER(state) {
        state.user = null;
        window.localStorage.removeItem('user');
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}