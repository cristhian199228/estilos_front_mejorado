<template>
    <div>
        <v-row no-gutters>
            <v-col cols="12" offset-lg="1" offset-md="2" lg="10" md="10" sm="12" xs="12">
                <v-card outlined color="transparent" class="mt-5" elevation="0">
                    <v-row>
                        <v-col cols="12" md="7">
                            <v-card class="pa-2">
                                <v-card class="mx-auto" scrollable elevation="0">
                                    <v-card class="mx-auto" max-width="800" elevation="0">
                                        <v-card-title>
                                            <span class="text-h6 font-weight-light">Legal de la promoción</span>
                                        </v-card-title>

                                        <v-card-text class="text-h5 font-weight-bold">
                                            <p>Yo</p>
                                            <v-text-field dense v-model="representante_legal"
                                                label="NOMBRE DEL REPRESENTANTE DEL ESTABLECIMIENTO AFILIADO">
                                            </v-text-field>
                                            representante de {{ razon_social }}. con RUC: {{
                                                    ruc
                                            }}.
                                            Declaro que la información proporcionada para la
                                            elaboración de la presente promoción es correcta, y que
                                            los datos registrados se han elaborado sin omitir ni
                                            falsear dato alguno. Encontrándose Tarjeta Estilos
                                            facultada a realizar los ajustes pertinentes con la
                                            finalidad de hacer más efectiva la comunicación.
                                        </v-card-text>
                                        <v-row>
                                            <v-checkbox v-model="confirmacion_veracidad"
                                                label=" Confirmo la veracidad de la informacion" type="checkbox"
                                                class="mx-8"></v-checkbox>
                                        </v-row>
                                        <v-row>
                                            <v-checkbox v-model="acepta_terminos" label="Acepto Terminos y Condiciones"
                                                type="checkbox" class="mx-8 mb-6"></v-checkbox>
                                        </v-row>
                                        <v-card-actions>
                                            <v-btn link to="/legales" class="mx-8 rounded-lg" tile dark color="#70142D">
                                                Anterior
                                            </v-btn>
                                            <v-btn @click="guardarDatos()" dark class="mx-8 rounded-lg" color="#70142D">
                                                Enviar
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-card>
                            </v-card>
                        </v-col>
                        <v-col cols="12" md="5">
                            <v-card color="#E5E5E5">
                                <v-card-text>
                                    <EditorView ref="editor" divStage="stage-parent-enviar"
                                        idContainer="container-enviar" v-bind:editable="false" />
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
  
<script>
import EditorView from "../promocion/EditorView.vue";
export default {
    components: {
        EditorView,
    },
    data: () => ({
    }),
    methods: {
        guardarDatos() {
            this.$store.dispatch('promocion/guardarPromocion')
        }
    },
    created() {
        this.$store.dispatch("promocion/getPlantillas");
    },
    computed: {
        razon_social() {
            return this.$store.getters['user/getUser'].establecimiento.razon_social
        },
        ruc() {
            return this.$store.getters['user/getUser'].establecimiento.ruc
        },
        representante_legal: {
            get() { return this.$store.state.datos_persistentes.legales_valores.representante_legal },
            set(newValue) { this.$store.commit('SET_REPRESENTANTE_LEGAL_LEGALES', newValue); }
        },
        confirmacion_veracidad: {
            get() { return this.$store.state.datos_persistentes.legales_valores.confirmacion_veracidad },
            set(newValue) { this.$store.commit('SET_CONFIRMACION_VERACIDAD_LEGALES', newValue); }
        },
        acepta_terminos: {
            get() { return this.$store.state.datos_persistentes.legales_valores.acepta_terminos },
            set(newValue) { this.$store.commit('SET_ACEPTA_TERMINOS_LEGALES', newValue); }
        }
    },
};
</script>
