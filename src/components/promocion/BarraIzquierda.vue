<template>
  <div>
    <v-card outlined color="#E5E5E5">
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-card outlined color="transparent">
              <v-card-title>
                <h5> 1. Elige la Plantilla</h5>
              </v-card-title>
              <v-card-text>
                <!-- TODO arreglar flechas -->
                <v-row align="center" justify="center">
                  <v-col cols="3">
                    <v-btn @click="restarPlantilla()" icon color="#6E6E6E">
                      <v-spacer></v-spacer> <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="6">
                    <EditorView ref="editor" divStage="stage-parent-miniatura" idContainer="container-miniatura"
                      v-bind:editable="false" />
                    <!--  <v-img :src="ruta_foto_plantilla" @click="SetPlantilla(item)">
                    </v-img> -->
                  </v-col>
                  <v-col cols="3">
                    <v-btn @click="sumarPlantilla()" icon color="#6E6E6E">
                      <v-icon>mdi-chevron-right</v-icon><v-spacer></v-spacer>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card outlined color="transparent">
              <v-card-title>
                <h5>2.-Escribe el nombre de tu empresa</h5>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="Escribe Aqui o añade tu logo" :disabled="!usar_texto_establecimiento"
                      hide-details color="black" background-color="white"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="7">
                    <v-btn-toggle dense color="#70142D" multiple>
                      <v-btn v-for="(item, i) in botonesMultiple" :disabled="!usar_texto_establecimiento" :key="i"
                        x-small>
                        <v-icon :color="item.color" dense>
                          {{ item.icon }}
                        </v-icon>
                      </v-btn>
                    </v-btn-toggle>
                    <v-btn-toggle dense color="#70142D">
                      <v-btn v-for="(item, i) in botonesSolo" :disabled="!usar_texto_establecimiento" :key="i" x-small>
                        <v-icon :color="item.color" dense>
                          {{ item.icon }}
                        </v-icon>
                      </v-btn>
                    </v-btn-toggle>
                    <v-switch v-model="usar_texto_establecimiento" color="#70142D" :label="`Usar texto`">
                    </v-switch>
                  </v-col>
                  <v-col cols="5">
                    <v-avatar size="80" tile>
                      <v-img src="https://lexa.cl/wp-content/uploads/2018/11/logo.png" max-height="90"></v-img>
                    </v-avatar>
                    <v-btn x-small dark @click="mostrardialogo()" color="#70142D" class="rounded-lg">
                      Subir logo
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card outlined color="transparent">
              <v-card-title>
                <h5> 3.-Escriba su promoción aqui:</h5>
                Model: {{ formato_productos_promocion }}
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" lg="6" md="6" sm="6" xs="12">
                    <v-textarea label="Productos" v-model="productos_promocion" rows="3" row-height="5"
                      background-color="white" hide-details></v-textarea>
                    <v-btn-toggle dense color="#70142D" v-model="formato_productos_promocion" multiple>
                      <v-btn v-for="(item, i) in botonesMultiple" :key="i" x-small>
                        <v-icon :color="item.color" dense>
                          {{ item.icon }}
                        </v-icon>
                      </v-btn>
                    </v-btn-toggle>
                    <v-btn-toggle dense color="#70142D">
                      <v-btn v-for="(item, i) in botonesSolo" @click="cambiarAlineacionTextoPromocion(i)" :key="i"
                        x-small>
                        <v-icon :color="item.color" dense>
                          {{ item.icon }}
                        </v-icon>
                      </v-btn>
                    </v-btn-toggle>
                  </v-col>
                  <v-col cols="12" lg="6" md="6" sm="6" xs="12">
                    <v-textarea label="Precio" v-model="precio_promocion" rows="3" row-height="5"
                      background-color="white" hide-details></v-textarea>
                    <v-btn-toggle dense color="#70142D" multiple>
                      <v-btn v-for="(item, i) in botonesMultiple" @click="cambiarFormatoTexto(i, 'precio_promocion')"
                        :key="i" x-small>
                        <v-icon :color="item.color" dense>
                          {{ item.icon }}
                        </v-icon>
                      </v-btn>
                    </v-btn-toggle>
                    <v-btn-toggle dense color="#70142D">
                      <v-btn v-for="(item, i) in botonesSolo" @click="cambiarAlineacionPrecioPromocion(i)" :key="i"
                        x-small>
                        <v-icon :color="item.color" dense>
                          {{ item.icon }}
                        </v-icon>
                      </v-btn>
                    </v-btn-toggle>
                  </v-col>
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
import EditorView from "./EditorView.vue";
export default {
  components: {
    EditorView,
  },
  data: () => ({
    usar_texto_local: false,
    formato_productos_promocion: [],
    botonesSolo: [
      {
        icon: "mdi-format-align-left",
        color: "black",
      },
      {
        icon: "mdi-format-align-center",
        color: "black",
      },
      {
        icon: "mdi-format-align-right",
        color: "black",
      },
    ],
    botonesMultiple: [
      {
        icon: "mdi-format-bold",
        color: "black",
      },
      {
        icon: "mdi-format-italic",
        color: "black",
      },
      {
        icon: "mdi-format-text-variant",
        color: "red",
      },
      {
        icon: "mdi-format-text",
        color: "blue",
      },
    ],
  }),
  watch: {
    formato_productos_promocion(value) {
      console.log(value)
    }
  },
  methods: {
    sumarPlantilla() {
      this.$store.commit('promocion/AUMENTAR_KEY_PLANTILLA_SELECCIONADA');
    },
    restarPlantilla() {
      this.$store.commit('promocion/DISMINUIR_KEY_PLANTILLA_SELECCIONADA');
    },
    cambiarFormatoTexto(i, ref) {
      console.log(this.formato_productos_promocion)
      const found = this.formato_productos_promocion.includes(1);
      console.log(found)
      if (i === 0 && ref == 'precio_promocion') this.$store.commit('promocion/SET_BOLD_TEXTO', 'precio_promocion')
      if (i === 0 && ref == 'productos_promocion') this.$store.commit('promocion/SET_BOLD_TEXTO', 'productos_promocion')
      if (i === 1 && ref == 'precio_promocion') this.$store.commit('promocion/SET_ITALIC_TEXTO', 'precio_promocion')
      if (i === 1 && ref == 'productos_promocion') this.$store.commit('promocion/SET_ITALIC_TEXTO', 'productos_promocion')
    },
  },
  computed: {
    ruta_foto_plantilla() {
      return this.$store.getters['promocion/getRutaFotoPlantillaSeleccionada']
    },
    plantillas() {
      return this.$store.state.promocion.plantillas
    },
    productos_promocion: {
      get() { return this.$store.state.promocion.productos_promocion.text },
      set(newValue) { this.$store.commit('promocion/SET_PRODUCTOS_PROMOCION', newValue); }
    },
    precio_promocion: {
      get() { return this.$store.state.promocion.precio_promocion.text },
      set(newValue) { this.$store.commit('promocion/SET_PRECIO_PROMOCION', newValue); }
    },
    usar_texto_establecimiento: {
      get() { return this.$store.state.promocion.usar_texto_establecimiento },
      set(newValue) { this.$store.commit('promocion/SET_USAR_TEXTO_ESTABLECIMIENTO', newValue); }
    },
  },
  async created() {
    await this.$store.dispatch("promocion/getPlantillas");
  },
  mounted() {
  },
};
</script>