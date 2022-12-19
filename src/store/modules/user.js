import axios from 'axios'
import router from "../../router";
axios.defaults.baseURL = process.env.VUE_APP_API_URL

const state = {
    user: null,
}

const getters = {
    getUser: state => state.user,
    getIdRubro: (getters) => {
       return `${getters.getUser.establecimiento.idrubro}`
    },
}

const actions = {
    async login({ commit }, params) {
        try {
            const res = await axios.post('api/login', params)
            commit('SHOW_SUCCESS_SNACKBAR', await res.data.message, { root: true })
            commit('SET_USER', await res.data.usuario)
            commit('SET_MOSTRAR_NAV_ICON', true, { root: true });
            commit('SHOW_NAVIGATION_DRAWER', true, { root: true }); 
            commit('SET_BACKGROUND', 'logueado', { root: true })
            await router.push('/inicio');
        } catch (e) {
            commit('SHOW_ERROR_SNACKBAR', await e.response.data.message, { root: true })
        }
    },
}

const mutations = {
    SET_USER(state, user) {
        state.user = user
        window.localStorage.setItem('user', JSON.stringify(user));
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}