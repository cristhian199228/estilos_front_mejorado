<template>
  <div>
    <v-dialog v-model="dialog_subir_logo" max-width="600px" persistent>
      <v-card>
        <v-card-title>SUBIR LOGO</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-file-input show-size accept="image/*" ref="photo" @change="seleccionarFoto" label="Foto"></v-file-input>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="normal" @click="close">CANCELAR</v-btn>
          <v-btn dark color="red darken-4" @click="subirLogo">
            <v-icon left dark>mdi-cloud-upload</v-icon>Subir
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
  computed: {
    dialog_subir_logo() {
      return this.$store.state.promocion.dialog_subir_logo;
    }
  },
  watch: {
  },
  methods: {
    close() {
      this.$store.state.promocion.dialog_subir_logo = false
    },
    seleccionarFoto(file) {
      this.archivo = file;
    },
    async subirLogo() {
      const data = {
        establecimiento_id: this.$store.state.user.user.establecimiento.id,
        archivo: this.archivo
      }
      await this.$store.dispatch('promocion/subirLogo', data);
    }
  },
  async created() {
  },
};
</script>