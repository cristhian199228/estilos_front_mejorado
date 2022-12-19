<template>
  <div>
    <v-card class="mx-auto" color="#E5E5E5">
      <v-toolbar outlined color="#E5E5E5">
        <v-spacer></v-spacer>
        <v-toolbar-title>Si tienes tu propia imagen puedes subirla
          aqui
        </v-toolbar-title>
        <v-btn @click="mostrarDialogSubirFoto()" class="mx-8 rounded-lg" tile dark color="#70142D">
          <v-icon left> mdi-plus</v-icon>
          Subir Foto
        </v-btn>
      </v-toolbar>
      <v-row>
        <v-col>
          <v-card class="ma-3" outlined color="#E5E5E5">
            <v-card-text class="text-center">
              <cropper ref="cropper" class="cropper" :src="getRutaFoto" maxWidth="1080" minWidth="1080" maxHeight="1080"
                minHeight="1080" />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn link @click="validarFoto()" class="mb-8 rounded-lg" tile dark color="#70142D">
                Siguiente
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
export default {
  components: {
    Cropper
  },
  data: () => ({
  }),
  methods: {
    async validarFoto() {
      const result = await this.$refs.cropper.getResult();
      this.$store.dispatch('foto/subirFotoParaModelar', result.canvas.toDataURL("image/jpeg", 1.0))
    },
    mostrarDialogSubirFoto() {
      this.$store.commit('foto/SHOW_DIALOG_SUBIR_FOTO',true)
    }
  },
  created() {
  },
  computed: {
    getRutaFoto() {
      return this.$store.getters['foto/getRutaFoto']
    }
  },
};
</script>
<style>
.cropper {
  height: 50vh;
}
</style>
