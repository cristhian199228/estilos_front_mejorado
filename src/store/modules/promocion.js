import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_URL

const state = {
    plantillas: [],
    key_plantilla_seleccionada: 0,
    promocion: {},
    usar_texto_establecimiento: true,
    stage: null,
    dialog_color: false,
    dialog_font: false,
    cf_elemento_seleccionado: null,
    precio_promocion: {
        text: 'S/xx.xx',
        font_style: '',
        align: '',
        fill: 'black',
        font_family: ''
    },
    productos_promocion: {
        text: '- producto 1\n- producto 2\n- producto 3\n- producto 4',
        font_style: '',
        align: '',
        fill: 'black',
        font_family: ''
    },
    texto_establecimiento: {
        text: '',
        font_style: '',
        align: '',
        fill: 'black',
        font_family: ''
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
    SET_TEXTO_ESTABLECIMIENTO(state, texto_establecimiento) {
        state.texto_establecimiento.text = texto_establecimiento
    },
    SET_USAR_TEXTO_ESTABLECIMIENTO(state, usar_texto) {
        state.usar_texto_establecimiento = usar_texto
    },
    //TODO mejorar para no usar ifs
    SET_FORMAT_TEXTO(state, data) {
        if (data.target == 'precio_promocion') state.precio_promocion.font_style = data.font_style
        if (data.target == 'productos_promocion') state.productos_promocion.font_style = data.font_style
        if (data.target == 'texto_establecimiento') state.texto_establecimiento.font_style = data.font_style
    },
    SET_ALINEACION_TEXTO(state, data) {
        if (data.target == 'precio_promocion') state.precio_promocion.align = data.align
        if (data.target == 'productos_promocion') state.productos_promocion.align = data.align
        if (data.target == 'texto_establecimiento') state.texto_establecimiento.align = data.align
    },
    SHOW_DIALOG_COLOR_FUENTE(state, data) {
        if (data.target == 'precio_promocion' && data.modal == 'color') { state.dialog_color = true; state.cf_elemento_seleccionado = data.target }
        if (data.target == 'precio_promocion' && data.modal == 'font') { state.dialog_font = true; state.cf_elemento_seleccionado = data.target }
        if (data.target == 'productos_promocion' && data.modal == 'color') { state.dialog_color = true; state.cf_elemento_seleccionado = data.target }
        if (data.target == 'productos_promocion' && data.modal == 'font') { state.dialog_font = true; state.cf_elemento_seleccionado = data.target }
        if (data.target == 'texto_establecimiento' && data.modal == 'color') { state.dialog_color = true; state.cf_elemento_seleccionado = data.target }
        if (data.target == 'texto_establecimiento' && data.modal == 'font') { state.dialog_font = true; state.cf_elemento_seleccionado = data.target }
    },
    SET_COLOR_TEXTO(state, data) {
        if (state.cf_elemento_seleccionado == "precio_promocion") state.precio_promocion.fill = data
        if (state.cf_elemento_seleccionado == "productos_promocion") state.productos_promocion.fill = data
        if (state.cf_elemento_seleccionado == "texto_establecimiento") state.texto_establecimiento.fill = data
    },
    SET_FONT_TEXTO(state, data) {
        if (state.cf_elemento_seleccionado == "precio_promocion") state.precio_promocion.font_family = data
        if (state.cf_elemento_seleccionado == "productos_promocion") state.productos_promocion.font_family = data
        if (state.cf_elemento_seleccionado == "texto_establecimiento") state.texto_establecimiento.font_family = data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}