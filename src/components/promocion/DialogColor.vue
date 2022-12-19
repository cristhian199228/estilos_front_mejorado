<template>
    <div>
      <v-dialog max-width="300px" persistent v-model="dialog_color">
        <v-card>
          <v-card-title>SELECCIONAR COLOR </v-card-title>
          <v-card-text>
            <v-spacer></v-spacer>
            <v-color-picker dot-size="25" mode="hexa" v-model="color" swatches-max-height="200"></v-color-picker>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="red" @click="close">CERRAR</v-btn>
            <v-btn text color="blue" @click="change">ACEPTAR</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  export default {
    data: () => ({
        color:"#BE2E2EFF"
    }),
    computed: {
        dialog_color(){
            return this.$store.state.promocion.dialog_color
        }
    },
    watch: {
    },
    methods: {
      close() {
        this.$store.state.promocion.dialog_color =false
      },
      change() {
        this.$store.state.promocion.dialog_color =false
        this.$store.commit('promocion/SET_COLOR_TEXTO',this.color)
       // this.SET_COLOR(this.color);
      },
    },
    async created() {
    },
  };
  </script>