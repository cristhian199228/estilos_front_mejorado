import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_URL

const state = {
    plantillas: [],
    key_plantilla_seleccionada: 0,
    promocion: {},
    usar_texto_establecimiento: false,
    stage:null,
    precio_promocion: {
        text: 'S/xx.xx',
        font_style: ''
    },
    productos_promocion: {
        text: '- producto 1\n- producto 2\n- producto 3\n- producto 4',
        font_style: ''
    }
}

const getters = {
    getPlantillaSeleccionada: state => {
        if (state.plantillas.length > 0) return state.plantillas[state.key_plantilla_seleccionada]
    },
    getRutaFotoPlantillaSeleccionada: (state, getters) => {
        if (state.plantillas.length > 0) return process.env.VUE_APP_API_URL + '/api/mostrarFotoPlantilla/' + getters.getPlantillaSeleccionada.ruta
    },
    getIdPlantillaSeleccionada: (state, getters) => {
        if (state.plantillas.length > 0) return getters.getPlantillaSeleccionada.id
    }
}

const actions = {
    async getPlantillas({ commit }) {
        const res = await axios.get("api/getPlantillas/")
        commit('SET_PLANTILLAS', res.data.data);
    },
}

const mutations = {
    SET_PLANTILLAS(state, plantillas) {
        state.plantillas = plantillas;
    },
    AUMENTAR_KEY_PLANTILLA_SELECCIONADA(state) {
        if (state.key_plantilla_seleccionada < state.plantillas.length - 1) state.key_plantilla_seleccionada += 1
    },
    DISMINUIR_KEY_PLANTILLA_SELECCIONADA(state) {
        if (state.key_plantilla_seleccionada > 0) state.key_plantilla_seleccionada -= 1
    },
    SET_PRECIO_PROMOCION(state, precio) {
        state.precio_promocion.text = precio
    },
    SET_PRODUCTOS_PROMOCION(state, productos) {
        state.productos_promocion.text = productos
    },
    SET_USAR_TEXTO_ESTABLECIMIENTO(state, usar_texto) {
        state.usar_texto_establecimiento = usar_texto
    },
    SET_BOLD_TEXTO(state, usar_texto) {
        if (usar_texto == 'precio_promocion') state.precio_promocion.font_style = 'bold'
        if (usar_texto == 'productos_promocion') state.productos_promocion.font_style = 'bold'
    },
    SET_ITALIC_TEXTO(state, usar_texto) {
        state.usar_texto_establecimiento = usar_texto
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}