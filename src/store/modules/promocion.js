import axios from 'axios'
import router from "../../router";
axios.defaults.baseURL = process.env.VUE_APP_API_URL

const state = {
    plantillas: [],
    promocion: [],
    promocion_seleccionada: null,
    ruta_foto: process.env.VUE_APP_API_URL + "/api/mostrarFoto/",
    key_plantilla_seleccionada: 0,
    usar_texto_establecimiento: true,
    stage: null,
    dialog_color: false,
    dialog_font: false,
    dialog_subir_logo: false,
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
    },
    res: 1,
    formato: 'PNG',
    descarga: 0,
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
    },
    getRutaFotoSeleccionada: (state) => {
        return state.ruta_foto + state.promocion_seleccionada.foto.ruta
    },
}

const actions = {
    async getPlantillas({ commit }) {
        const res = await axios.get("api/getPlantillas")
        commit('SET_PLANTILLAS', res.data.data);
    },
    async getPromociones({ commit }, data) {
        const res = await axios.get("api/getPromociones/" + data.inicio + '/' + data.final)
        commit('SET_PROMOCION', res.data.data);
    },
    async getPromocionSeleccionada({ commit }, id) {
        const res = await axios.get("api/getPromocion/" + id)
        commit('SET_PROMOCION_SELECCIONADA', res.data.data);
    },
    async subirLogo({ state, rootState }, foto) {
        const config = {
            headers: { "content-type": "multipart/form-data" },
        };
        const formData = new FormData();
        formData.append("file", foto['archivo']);
        formData.append("establecimiento_id", foto['establecimiento_id']);
        const res = await axios.post("api/subirLogo", formData, config);
        state.dialog_subir_logo = false
        rootState.user.user.establecimiento.ruta_logo = res.data.data.ruta_logo
    },
    async guardarStageCanvas({ commit, state }) {
        const json = await state.stage.toJSON();
        commit('SET_STAGE_JSON', json, { root: true });
        router.push('/legales');
    },
    async guardarPromocion({ rootState, rootGetters }) {
        const promocion = {
            foto_id: rootState.datos_persistentes.foto_seleccionada.id,
            plantilla_id: rootGetters['promocion/getIdPlantillaSeleccionada'],
            direccion: rootState.datos_persistentes.legales_valores.direccion,
            celular: rootState.datos_persistentes.legales_valores.celular,
            horario: rootState.datos_persistentes.legales_valores.horario,
            vigencia: rootState.datos_persistentes.legales_valores.vigencia,
            restricciones: rootState.datos_persistentes.legales_valores.restricciones,
            acepta: rootState.datos_persistentes.legales_valores.acepta_terminos,
            json: rootState.datos_persistentes.stage_json,
        }
        await axios.post("api/guardarPromocion", promocion);
        router.push('/envio_satisfactorio');
    },
    async terminarPromocion({ commit }) {

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
            }
        }
        commit('SET_DATOS_PERSISTENTES', datos, { root: true })
        router.push('/inicio');
    },
    async exportarPromocion({ state }) {
        state.descarga += 1
    },
}

const mutations = {
    SET_PLANTILLAS(state, plantillas) {
        state.plantillas = plantillas;
    },
    SET_PROMOCION(state, promocion) {
        state.promocion = promocion
    },
    AUMENTAR_KEY_PLANTILLA_SELECCIONADA(state) {
        if (state.key_plantilla_seleccionada < state.plantillas.length - 1) state.key_plantilla_seleccionada += 1
    },
    DISMINUIR_KEY_PLANTILLA_SELECCIONADA(state) {
        if (state.key_plantilla_seleccionada > 0) state.key_plantilla_seleccionada -= 1
    },
    SET_STAGE(state, stage) {
        state.stage = stage
    },
    SET_PRECIO_PROMOCION(state, precio) {
        state.precio_promocion.text = precio
    },
    SET_PROMOCION_SELECCIONADA(state, promocion) {
        state.promocion_seleccionada = promocion
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