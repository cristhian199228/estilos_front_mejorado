<template>
    <div>
        <!-- TODO mejorar esqueleto -->
        <v-row>
            <v-col cols="12" offset-lg="1" offset-md="2" lg="10" md="10" sm="12" xs="12">
                <v-row>
                    <v-col cols="12" md="5">
                        <v-card max-width="800" class="mx-auto" scrollable elevation="0">
                            <v-card-text>
                                <v-row>
                                    <v-col cols="4">
                                        <v-subheader>Dirección</v-subheader>
                                    </v-col>
                                    <v-col cols="8">
                                        <v-text-field label="Ejemplo Av. Lima 505 cercado" single-line
                                            v-model="direccion" @keyup="validar()"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="4">
                                        <v-subheader>Celular o Telefono</v-subheader>
                                    </v-col>
                                    <v-col cols="8">
                                        <v-text-field label="Ejemplo : 9949748897-054200000" single-line
                                            v-model="celular" @keyup="validar()"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="4">
                                        <v-subheader>Horario de Atencion</v-subheader>
                                    </v-col>
                                    <v-col cols="8">

                                        <v-text-field label="Ejemplo:Lunes a Sabado de 10:00 am a 16:00 pm" single-line
                                            v-model="horario" @keyup="validar()"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="4">
                                        <v-subheader>Vigencia</v-subheader>
                                    </v-col>
                                    <v-col cols="8">

                                        <v-text-field label="Ejemplo: Del 19 de julio al 31 de agosto de 2021"
                                            single-line v-model="vigencia" @keyup="validar()"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="4">
                                        <v-subheader>Restricciones</v-subheader>
                                    </v-col>
                                    <v-col cols="8">

                                        <v-text-field
                                            label="Ejemplo: No acumulable con otras promociones solo por Delivery"
                                            single-line v-model="restricciones" @keyup="validar()"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn link to="/promocion" class="mx-8 rounded-lg" tile dark color="#70142D">
                                    Anterior
                                </v-btn>
                                <v-btn @click="guardarDatos()" :dark="valid" :disabled="!valid" class="mx-8 rounded-lg"
                                    color="#70142D">
                                    Siguiente
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="7">
                        <v-card color="#E5E5E5">
                            <v-card-text>
                                <EditorView ref="editor" divStage="stage-parent-legales" idContainer="container-legales"
                                    v-bind:editable="false" />
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import EditorView from "../promocion/EditorView.vue";
import goTo from 'vuetify/lib/services/goto'
export default {
    components: {
        EditorView,
    },
    data: () => ({
       /*  valid: false */
    }),
    methods: {
        guardarDatos() {
            this.$store.commit('SET_ENVIAR_VALIDADO', true)
            this.$router.push("enviar");
        },
        validar() {
            if (this.celular != null && this.celular.length > 0 &&
                this.restricciones != null && this.restricciones.length > 0 &&
                this.direccion != null && this.direccion.length > 0 &&
                this.vigencia != null && this.vigencia.length > 0 &&
                this.horario != null && this.horario.length > 0) { this.valid = true }
            else { this.valid = false }
        }
    },
    created() {
        this.$store.dispatch("promocion/getPlantillas");
    },
    mounted() {
        goTo(0)
    },
    computed: {
        celular: {
            get() { return this.$store.state.datos_persistentes.legales_valores.celular },
            set(newValue) { this.$store.commit('SET_CELULAR_LEGALES', newValue); }
        },
        restricciones: {
            get() { return this.$store.state.datos_persistentes.legales_valores.restricciones },
            set(newValue) { this.$store.commit('SET_RESTRICCIONES_LEGALES', newValue); }
        },
        direccion: {
            get() { return this.$store.state.datos_persistentes.legales_valores.direccion },
            set(newValue) { this.$store.commit('SET_DIRECCION_LEGALES', newValue); }
        },
        vigencia: {
            get() { return this.$store.state.datos_persistentes.legales_valores.vigencia },
            set(newValue) { this.$store.commit('SET_VIGENCIA_LEGALES', newValue); }
        },
        horario: {
            get() { return this.$store.state.datos_persistentes.legales_valores.horario },
            set(newValue) { this.$store.commit('SET_HORARIO_LEGALES', newValue); }
        },
        valid:{
            get() { return this.$store.state.datos_persistentes.legal_valido},
            set(newValue) { this.$store.commit('SET_LEGAL_VALIDO', newValue); }
        }
    },
    watch: {

    }
};
</script>