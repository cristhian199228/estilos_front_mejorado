<template>
    <div>
      <v-col cols="12" offset-lg="2" offset-md="1" lg="8" md="12" sm="12" xs="12">
        <v-card outlined color="transparent">
          <v-row>
            <v-col cols="12" lg="5" md="5" sm="12" xs="12">
              <BarraIzquierda />
            </v-col>
            <v-col cols="12" lg="7" md="7" sm="12" xs="12">
              <v-card ref="cardEditor" color="#E5E5E5">
                <v-card-text>
                  <EditorView ref="editor" divStage="stage-parent" idContainer="container" v-bind:editable="false" />
                </v-card-text>
                <v-card-actions>
                  <v-btn to="/revision" rounded tile dark color="#70142D">Atras</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </div>
  </template>
  <script>
  import EditorView from "../EditorView.vue";
  import BarraIzquierda from "./BarraIzquierda.vue";
  export default {
    components: {
      EditorView,
      BarraIzquierda
    },
    data: () => ({
    }),
    methods: {
      getJsonPromocion() {
        this.$store.dispatch('promocion/getPromocionSeleccionada', this.$route.params.promocion_id)
      },
      guardarPromocion() {
  
      }
    },
    created() {
      this.getJsonPromocion()
    },
    mounted() {
    },
  };
  </script>