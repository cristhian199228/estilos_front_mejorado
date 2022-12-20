import axios from 'axios'
import router from "../../router";
axios.defaults.baseURL = process.env.VUE_APP_API_URL

const state = {
    fotos: null,
    id_rubro_foto: 0,
    show_dialog_subir_foto: false,
    ruta_foto: process.env.VUE_APP_API_URL + "/api/mostrarFoto/",
}

const getters = {
}

const actions = {
    async getFotos({ commit }) {
        const res = await axios.get("api/getFotoRubro/" + state.id_rubro_foto)
        commit('SET_FOTOS', res.data.data);
    },
    async subirFotoParaModelar({rootState},foto) {
        const config = {
            headers: { "content-type": "multipart/form-data" },
        };
        const formData = new FormData();
        formData.append("file", foto);
        formData.append("foto_id", rootState.datos_persistentes.foto_seleccionada.id);
        await axios.post("/api/subirFotoParaModelar", formData, config)
        router.push('/promocion');
        /* TODO mejorar respuesta */
    },
    async subirNuevaFoto({ commit }, foto) {
        const config = {
            headers: { "content-type": "multipart/form-data" },
        };
        const formData = new FormData();
        formData.append("file", foto['archivo']);
        formData.append("idrubro", foto['rubro_id']);
        await axios.post("api/subirNuevaFoto", formData, config);
        commit('SHOW_DIALOG_SUBIR_FOTO', false);
    },
    async establecerFoto({ commit }, foto) {
        commit('SET_FOTO_SELECCIONADA', foto, { root: true });
    }
}

const mutations = {
    SHOW_DIALOG_SUBIR_FOTO(state, dialog) {
        state.show_dialog_subir_foto = dialog;
    },
    SET_FOTOS(state, fotos) {
        state.fotos = fotos;
    },
    SET_ID_RUBRO_FOTO(state, id) {
        state.id_rubro_foto = id;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}