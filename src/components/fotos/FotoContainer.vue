<template>
  <div>
    <v-card class="mx-auto mt-5" outlined color="transparent" max-width="70vw">
      <v-row>
        <v-col cols="12" xs="12" sm="4" md="4" lg="4" xl="4">
          <barraIzquierda />
        </v-col>
        <v-col cols="12" xs="12" sm="8" md="8" lg="8" xl="8">
          <barraDerecha />
        </v-col>
      </v-row>
    </v-card>
    <dialogSubirFoto />
  </div>
</template>

<script>
import dialogSubirFoto from "./dialogSubirFoto.vue";
import barraIzquierda from "./barraIzquierda.vue";
import barraDerecha from "./barraDerecha.vue";
import goTo from 'vuetify/lib/services/goto'
export default {
  components: {
    dialogSubirFoto,
    barraIzquierda,
    barraDerecha
  },
  created() {
    this.$store.dispatch('foto/getFotos');
    goTo(0)
  },
};
</script>
