<template>
  <!--   TODO mejorar responsive -->
  <div>
    <v-card class="pa-2" color="#E5E5E5">
      <v-card-title>
        <h5> Selecciona una imagen para tu diseño</h5>
      </v-card-title>
      <v-card-text>
        <v-select @change="seleccionarRubro" class="ma-2" background-color="white" :items="rubros"
          item-text="descripcion" item-value="id" label="Buscar" prepend-icon="mdi-magnify" outlined dense>
        </v-select>
        <v-container style="height: 65vh" class="overflow-y-auto">
          <v-row>
            <v-col v-for="(item, i) in fotos" :key="i" cols="12">
              <v-img contain :src="ruta_foto + item.ruta" class="white--text align-end" max-width="300" max-height="300"
                @click="SetFoto(item)">
              </v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {

  data: () => ({
  }),
  methods: {
    SetFoto(foto) {
      this.$store.dispatch('foto/establecerFoto', foto)
      this.$store.dispatch('foto/getFotos')
    },
    seleccionarRubro(rubro) {
      this.$store.commit('foto/SET_ID_RUBRO_FOTO', rubro)
      this.$store.dispatch('foto/getFotos')
    },
  },
  async created() {
    await this.$store.dispatch('foto/getFotos')
    await this.$store.dispatch("getRubros");
  },
  computed: {
    ruta_foto() {
      return this.$store.state.foto.ruta_foto
    },
    fotos() {
      return this.$store.state.foto.fotos
    },
    rubros() {
      return this.$store.state.rubros
    }
  },
};
</script>