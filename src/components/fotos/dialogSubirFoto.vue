<template>
    <div>
        <!--  TODO revisar validacion -->
        <v-dialog v-model="dialog" max-width="600px" persistent>
            <v-card>
                <v-card-title>SUBIR FOTO</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-file-input show-size accept="image/*" ref="photo" @change="seleccionarFoto" label="Foto">
                    </v-file-input>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="normal" class="rounded-lg" @click="close">CANCELAR
                    </v-btn>
                    <v-btn dark color="red darken-4" class="rounded-lg" @click="subirFoto">
                        <v-icon left dark>mdi-cloud-upload</v-icon>
                        Subir
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script>
export default {
    data: () => ({
        archivo: null
    }),
    methods: {
        close() {
            this.$store.commit('foto/SHOW_DIALOG_SUBIR_FOTO', false)
        },
        seleccionarFoto(file) {
            this.archivo = file;
        },
        async subirFoto() {
            const data = {
                rubro_id: this.$store.state.user.user.establecimiento.rubro_id,
                archivo: this.archivo
            }
            await this.$store.dispatch('foto/subirNuevaFoto', data);
            await this.$store.dispatch('foto/getFotos');
        },
    },
    created() {
    },
    computed: {
        dialog() {
            return this.$store.state.foto.show_dialog_subir_foto
        }
    },
};
</script>
