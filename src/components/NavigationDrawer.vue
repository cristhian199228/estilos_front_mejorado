<template>
  <div>
    <v-navigation-drawer v-model="drawerState" app>
      <v-list dense >
        <v-list-item to="/inicio">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title><strong>Inicio</strong></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/fotos"  >
          <v-list-item-action>
            <v-icon>mdi-camera</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title><strong>Fotos</strong></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/promocion">
          <v-list-item-action>
            <v-icon >mdi-newspaper-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title><strong>Plantilla</strong></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/legales" >
          <v-list-item-action>
            <v-icon >mdi-file
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title><strong>Legales</strong></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/enviar" >
          <v-list-item-action>
            <v-icon >mdi-send</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title><strong>Enviar</strong></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-power</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title><strong>Salir</strong></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    drawerState: {
      get() { return this.$store.getters.drawerState },
      set(v) { return this.$store.commit('SHOW_NAVIGATION_DRAWER', v) }
    },
  },
  mounted() { },
  methods: {
    logout(){
      this.$store.dispatch('user/logout')
    }
  }
}
</script>