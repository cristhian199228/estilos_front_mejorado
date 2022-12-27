<template>
    <div>
      <v-col cols="12" offset-lg="4" offset-md="4" lg="8" md="12" sm="12" xs="12">
        <v-card outlined color="transparent">
          <v-row>
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
  export default {
    components: {
      EditorView
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