<template>
  <div>
    <v-footer dark padless color="#424242">
      <v-card class="flex" flat tile>
        <v-card-title>
          <v-row>
            <v-col cols="12" sm="4">
              <v-card class="pa-2 text-center" outlined tile color="transparent">
                <v-btn href="https://www.estilos.com.pe/extras/libro_reclamaciones" target="_blank" class="mx-4" dark icon>
                  <v-icon size="30px"> mdi-book-open-page-variant</v-icon>
                </v-btn>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4">
              <v-card flat tile width="100%" class="text-center">
                <v-btn href="https://www.facebook.com/TarjetaEstilosOficial" target="_blank" class="mx-4" dark icon>
                  <v-icon size="24px"> mdi-facebook </v-icon>
                </v-btn>
                <v-btn href="https://www.instagram.com/tarjetaestilos/" target="_blank" class="mx-4" dark icon>
                  <v-icon size="24px"> mdi-instagram </v-icon>
                </v-btn>
                <v-btn href="https://www.youtube.com/channel/UCJnKt27XGVA6kjBFbXevbfA/featured?app=desktop"
                  target="_blank" class="mx-4" dark icon>
                  <v-icon size="24px"> mdi-youtube </v-icon>
                </v-btn>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4">
              <v-card class="pa-2" outlined color="transparent" tile>
                <v-img max-height="30" contain src="/app/nuestra_familia.svg"></v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} — <strong>Tarjeta Estilos</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'FooterView',
  data() {
    return {
    }
  },
  computed: {

  },
  mounted() {
  },
  methods: {

  }
}
</script>
