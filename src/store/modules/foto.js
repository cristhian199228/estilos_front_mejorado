import axios from 'axios'
import router from "../../router";
axios.defaults.baseURL = process.env.VUE_APP_API_URL

const state = {
    foto_seleccionada: null,
    ruta_foto: process.env.VUE_APP_API_URL + "/api/mostrarFoto/",
    fotos: null,
    id_rubro_foto: 0,
    show_dialog_subir_foto: false
}

const getters = {
    getRutaFoto: (state) => {
        if (state.foto_seleccionada) return state.ruta_foto + state.foto_seleccionada.ruta
    },
}

const actions = {
    async getFotos({ commit }) {
        const res = await axios.get("api/getFotoRubro/" + state.id_rubro_foto)
        commit('SET_FOTOS', res.data.data);
    },
    async subirFotoParaModelar({ commit }, foto) {
        const config = {
            headers: { "content-type": "multipart/form-data" },
        };
        const formData = new FormData();
        formData.append("file", foto);
        formData.append("foto_id", state.foto_seleccionada.id);
        await axios.post("/api/subirFotoParaModelar", formData, config)
        commit('SET_FOTOS_COMPLETADO', true, { root: true });
        router.push('/promocion');
        /* TODO mejorar respuesta */
    },
    async subirNuevaFoto({ commit}, foto) {
        const config = {
            headers: { "content-type": "multipart/form-data" },
        };
        const formData = new FormData();
        formData.append("file", foto['archivo']);
        formData.append("idrubro", foto['rubro_id']);
        await axios.post("api/subirNuevaFoto", formData, config);
        commit('SHOW_DIALOG_SUBIR_FOTO', false);
    }
}

const mutations = {
    SET_FOTO_SELECCIONADA(state, foto) {
        state.foto_seleccionada = foto;
        window.localStorage.setItem('foto_seleccionada', JSON.stringify(foto));
    },
    SHOW_DIALOG_SUBIR_FOTO(state, dialog) {
        state.show_dialog_subir_foto = dialog;
    },
    SET_RUTA_FOTO(state, ruta_foto) {
        state.ruta_foto = ruta_foto;
        window.localStorage.setItem('ruta_foto', JSON.stringify(ruta_foto));
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