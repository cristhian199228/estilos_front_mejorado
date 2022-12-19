<template>
  <div>
    <v-dialog max-width="300px" persistent v-model="dialog_font">
      <v-card>
        <v-card-title>Seleccionar Tipo de Letra</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-radio-group v-model="fuenteLetra" column>
            <v-radio label="Arial" value="Arial"></v-radio>
            <v-radio label="Poppins" value="Poppins-Regular"></v-radio>
            <v-radio label="Verdana" value="Verdana"></v-radio>
            <v-radio label="Cooper Black" value="Cooper Black"></v-radio>
            <v-radio label="Century Gothic" value="Century Gothic"></v-radio>
            <v-radio label="Avenir" value="AvenirRoman"></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="red darken-1" text @click="close()">
            Cerrar
          </v-btn>
          <v-btn color="blue darken-1" text @click="change()">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    fuenteLetra: "Arial"
  }),
  computed: {
    dialog_font(){
      return this.$store.state.promocion.dialog_font
    }
  },
  watch: {
  },
  methods: {
    close() {
      this.$store.state.promocion.dialog_font =false
    },
    change() {
      this.$store.state.promocion.dialog_font =false
      this.$store.commit('promocion/SET_FONT_TEXTO',this.fuenteLetra)
    },
  },
  async created() {
  },
};
</script>