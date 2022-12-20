<template>
  <div>
    <v-col cols="12" offset-lg="2" offset-md="1" lg="8" md="10" sm="12" xs="12">
      <v-card class="mx-0 mt-5" outlined color="transparent" max-width="95vh">
        <v-row>
          <v-col cols="12" lg="5" md="5" sm="12" xs="12">
            <BarraIzquierda />
          </v-col>
          <v-col cols="12" lg="7" md="7" sm="12" xs="12">
            <v-card ref="cardEditor" color="#E5E5E5">
              <v-card-text>
                <EditorView ref="editor" divStage="stage-parent" idContainer="container" v-bind:editable="true" />
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn link to="/fotos" class="rounded-lg" tile dark color="#70142D">
                  Anterior
                </v-btn>
                <v-btn link @click="guardaryContinuar()" class="rounded-lg" tile dark color="#70142D">
                  Siguiente
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <DialogColor />
      <DialogFuente />
      <DialogSubirLogo />
    </v-col>
  </div>
</template>
<script>
import EditorView from "./EditorView.vue";
import DialogColor from "./DialogColor.vue";
import DialogFuente from "./DialogFuente.vue";
import DialogSubirLogo from "./DialogSubirLogo.vue";
import BarraIzquierda from "./BarraIzquierda.vue";
export default {
  components: {
    EditorView,
    BarraIzquierda,
    DialogColor,
    DialogFuente,
    DialogSubirLogo
  },
  data: () => ({
  }),
  methods: {
    guardaryContinuar(){
      this.$store.dispatch('promocion/guardarStageCanvas')
      this.$store.commit('SET_LEGALES_VALIDADO',true)
    }
  },
  created() {
     this.$store.dispatch("promocion/getPlantillas");
  },
  mounted() {
  },
};
</script>