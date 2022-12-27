<template>
  <div>
    <v-card outlined color="#E5E5E5">
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-card outlined color="transparent">
              <v-card-title>
                <h5> 1. Seleccionar Formato de Descarga</h5>
              </v-card-title>
              <v-card-text>
                <v-row align="center" justify="center">
                  <div class="mt-5 text-center">
                    <v-btn @click="selFormato('JPG')" class="mx-1" rounded tile dark color="#70142D">JPG</v-btn>
                    <v-btn @click="selFormato('PNG')" class="mx-1" rounded tile dark color="#70142D">PNG</v-btn>
                    <v-btn @click="selFormato('BMP')" class="mx-1" rounded tile dark color="#70142D">BMP</v-btn>
                  </div>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card outlined color="transparent">
              <v-card-title>
                <h5>2.-Seleccione la resolucion de la descarga</h5>
              </v-card-title>
              <v-card-text>
                <v-row align="center" justify="center">
                  <div class="mt-5 text-center">
                    <v-btn @click="selResolucion(0)" class="ma-1" rounded tile dark color="#70142D">500 x 500</v-btn>
                    <v-btn @click="selResolucion(1)" class="ma-1" rounded tile dark color="#70142D">1000 x 1000</v-btn>
                    <v-btn @click="selResolucion(2)" class="ma-1" rounded tile dark color="#70142D">1500 x 1500</v-btn>
                    <v-btn @click="selResolucion(3)" class="ma-1" rounded tile dark color="#70142D">2000 x 2000</v-btn>
                  </div>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card outlined color="transparent">
              <v-card-title>
                <h5>3.- Descargar : </h5>{{ $store.state.promocion.formato }} {{ resoluciones[
                    $store.state.promocion.res]
                }}
              </v-card-title>
              <v-card-text>
                <v-row align="center" justify="center">
                  <div class="mt-5 text-center">
                    <v-btn @click="download()" class="ma-1" rounded tile dark
                      color="#70142D"><v-icon>mdi-download</v-icon></v-btn>
                  </div>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    resoluciones: ['500 X 500', '1000 X 1000', '1500 X 1500', '2000 X 2000']
  }),
  watch: {
  },
  methods: {
    download() {
      this.$store.dispatch('promocion/exportarPromocion')
    },
    selFormato(opcion) {
      this.$store.state.promocion.formato = opcion
    },
    selResolucion(opcion) {
      this.$store.state.promocion.res = opcion
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
  },
};
</script>