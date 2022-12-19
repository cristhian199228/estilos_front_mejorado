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
                    <v-text-field label="Escribe Aqui o añade tu logo" v-model="texto_establecimiento"
                      :disabled="!usar_texto_establecimiento" hide-details color="black"
                      background-color="white"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="7">
                    <v-btn-toggle dense color="#70142D" v-model="formato_texto_establecimiento" multiple>
                      <v-btn v-for="(item, i) in botonesMultiple" :key="i" :disabled="!usar_texto_establecimiento"
                        :value="item.value" x-small>
                        <v-icon :color="item.color" dense>
                          {{ item.icon }}
                        </v-icon>
                      </v-btn>
                    </v-btn-toggle>
                    <v-btn-toggle dense color="#70142D" v-model="valor_cf_texto_establecimiento">
                      <v-btn v-for="(item, i) in botonesSoloColorFuente" :disabled="!usar_texto_establecimiento"
                        :value="item.value" @click="cf_texto_establecimiento(item.value)" :key="i" x-small>
                        <v-icon :color="item.color" dense>
                          {{ item.icon }}
                        </v-icon>
                      </v-btn>
                    </v-btn-toggle>
                    <v-btn-toggle dense color="#70142D" v-model="alineacion_texto_establecimiento">
                      <v-btn v-for="(item, i) in botonesSolo" :disabled="!usar_texto_establecimiento"
                        :value="item.value" :key="i" x-small>
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
                      <v-img :src="ruta_logo" contain max-height="90"></v-img>
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
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" lg="6" md="6" sm="6" xs="12">
                    <v-row>
                      <v-textarea label="Productos" v-model="productos_promocion" rows="3" row-height="5"
                        background-color="white" hide-details></v-textarea>
                    </v-row>
                    <v-row>
                      <v-btn-toggle dense color="#70142D" v-model="formato_productos_promocion" multiple>
                        <v-btn v-for="(item, i) in botonesMultiple" :key="i" :value="item.value" x-small>
                          <v-icon :color="item.color" dense>
                            {{ item.icon }}
                          </v-icon>
                        </v-btn>
                      </v-btn-toggle>
                      <v-btn-toggle dense color="#70142D" v-model="valor_cf_productos_promocion">
                        <v-btn v-for="(item, i) in botonesSoloColorFuente" :value="item.value"
                          @click="cf_productos_promocion(item.value)" :key="i" x-small>
                          <v-icon :color="item.color" dense>
                            {{ item.icon }}
                          </v-icon>
                        </v-btn>
                      </v-btn-toggle>
                      <v-btn-toggle dense color="#70142D" v-model="alineacion_productos_promocion">
                        <v-btn v-for="(item, i) in botonesSolo" :value="item.value" :key="i" x-small>
                          <v-icon :color="item.color" dense>
                            {{ item.icon }}
                          </v-icon>
                        </v-btn>
                      </v-btn-toggle>
                    </v-row>
                  </v-col>
                  <v-col cols="12" lg="6" md="6" sm="6" xs="12">
                    <v-row>
                      <v-textarea label="Precio" v-model="precio_promocion" rows="3" row-height="5"
                        background-color="white" hide-details></v-textarea>
                    </v-row>
                    <v-row>
                      <v-btn-toggle dense color="#70142D" v-model="formato_precio_promocion" multiple>
                        <v-btn v-for="(item, i) in botonesMultiple" :key="i" :value="item.value" x-small>
                          <v-icon :color="item.color" dense>
                            {{ item.icon }}
                          </v-icon>
                        </v-btn>
                      </v-btn-toggle>
                      <v-btn-toggle dense color="#70142D" v-model="valor_cf_precio_promocion">
                        <v-btn v-for="(item, i) in botonesSoloColorFuente" :value="item.value"
                          @click="cf_precio_promocion(item.value)" :key="i" x-small>
                          <v-icon :color="item.color" dense>
                            {{ item.icon }}
                          </v-icon>
                        </v-btn>
                      </v-btn-toggle>
                      <v-btn-toggle dense color="#70142D" v-model="alineacion_precio_promocion">
                        <v-btn v-for="(item, i) in botonesSolo" :value="item.value" :key="i" x-small>
                          <v-icon :color="item.color" dense>
                            {{ item.icon }}
                          </v-icon>
                        </v-btn>
                      </v-btn-toggle>
                    </v-row>
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
    formato_precio_promocion: [],
    formato_texto_establecimiento: [],
    alineacion_precio_promocion: [],
    alineacion_productos_promocion: [],
    alineacion_texto_establecimiento: [],
    valor_cf_precio_promocion: [],
    valor_cf_productos_promocion: [],
    valor_cf_texto_establecimiento: [],
    botonesSolo: [
      {
        icon: "mdi-format-align-left",
        color: "black",
        value: 'left'
      },
      {
        icon: "mdi-format-align-center",
        color: "black",
        value: 'center'
      },
      {
        icon: "mdi-format-align-right",
        color: "black",
        value: 'right'
      },
    ],
    botonesSoloColorFuente: [
      {
        icon: "mdi-format-text-variant",
        color: "red",
        value: 'color'
      },
      {
        icon: "mdi-format-text",
        color: "blue",
        value: 'font'
      },
    ],
    botonesMultiple: [
      {
        icon: "mdi-format-bold",
        color: "black",
        value: 'bold'
      },
      {
        icon: "mdi-format-italic",
        color: "black",
        value: 'italic'
      }
    ],
  }),
  watch: {
    formato_productos_promocion(value) {
      const data = {
        target: 'productos_promocion',
        font_style: value.join(' ')
      }
      this.$store.commit('promocion/SET_FORMAT_TEXTO', data)
    },
    formato_precio_promocion(value) {
      const data = {
        target: 'precio_promocion',
        font_style: value.join(' ')
      }
      this.$store.commit('promocion/SET_FORMAT_TEXTO', data)
    },
    formato_texto_establecimiento(value) {
      const data = {
        target: 'texto_establecimiento',
        font_style: value.join(' ')
      }
      this.$store.commit('promocion/SET_FORMAT_TEXTO', data)
    },
    alineacion_productos_promocion(value) {
      const data = {
        target: 'productos_promocion',
        align: value
      }
      this.$store.commit('promocion/SET_ALINEACION_TEXTO', data)
    },
    alineacion_precio_promocion(value) {
      const data = {
        target: 'precio_promocion',
        align: value
      }
      this.$store.commit('promocion/SET_ALINEACION_TEXTO', data)
    },
    alineacion_texto_establecimiento(value) {
      const data = {
        target: 'texto_establecimiento',
        align: value
      }
      this.$store.commit('promocion/SET_ALINEACION_TEXTO', data)
    },
  },
  methods: {
    sumarPlantilla() {
      this.$store.commit('promocion/AUMENTAR_KEY_PLANTILLA_SELECCIONADA');
    },
    restarPlantilla() {
      this.$store.commit('promocion/DISMINUIR_KEY_PLANTILLA_SELECCIONADA');
    },
    mostrardialogo() {
      this.$store.state.promocion.dialog_subir_logo = true;
    },
    async cf_productos_promocion(value) {

      const data = {
        target: 'productos_promocion',
        modal: value
      }
      await this.$store.commit('promocion/SHOW_DIALOG_COLOR_FUENTE', data)
      this.valor_cf_productos_promocion = []

    },
    async cf_precio_promocion(value) {
      const data = {
        target: 'precio_promocion',
        modal: value
      }
      await this.$store.commit('promocion/SHOW_DIALOG_COLOR_FUENTE', data)
      this.valor_cf_precio_promocion = []
    },
    async cf_texto_establecimiento(value) {
      const data = {
        target: 'texto_establecimiento',
        modal: value
      }
      await this.$store.commit('promocion/SHOW_DIALOG_COLOR_FUENTE', data)
      this.valor_cf_precio_promocion = []
    }
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
    texto_establecimiento: {
      get() { return this.$store.getters['user/getNombreComercial'] },
      set(newValue) { this.$store.commit('promocion/SET_TEXTO_ESTABLECIMIENTO', newValue); }
    },
    usar_texto_establecimiento: {
      get() { return this.$store.state.promocion.usar_texto_establecimiento },
      set(newValue) { this.$store.commit('promocion/SET_USAR_TEXTO_ESTABLECIMIENTO', newValue); }
    },
    ruta_logo() {
      return this.$store.getters['user/getRutaLogo']
    },

  },
  async created() {
    await this.$store.dispatch("promocion/getPlantillas");
  },
  mounted() {
  },
};
</script>