<template>
  <div>
    <v-app-bar color="white" elevation="0" app>
      <v-app-bar-nav-icon @click="drawerState = !drawerState" v-if="mostrar_nav_icon"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-img max-height="30" class="ml-auto" contain src="/app/logo_estilos.svg"></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="getUser">
        <v-menu :close-on-content-click="false" offset-y max-width="400px">
          <template v-slot:activator="{ on, attrs }">
            <div v-on="on">Hola , {{ getUser }}</div>
            <v-btn class="mx-3" icon dark v-bind="attrs" v-on="on">
              <v-icon color="orange">mdi-store</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title> {{ getUser }}</v-list-item-title>
                  <v-list-item-subtitle>{{ getNombreComercial }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="logout" dark color="#f57c00">SALIR</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </template>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  name: 'AppBar',
  data() {
    return {}
  },
  computed: {
    drawerState: {
      get() { return this.$store.getters.drawerState },
      set(v) { return this.$store.commit('SHOW_NAVIGATION_DRAWER', v) }
    },
    mostrar_nav_icon() {
      return this.$store.state.datos_persistentes.mostrar_nav_icon
    },
    getUser() {
      if (this.$store.state.user.user) return this.$store.state.user.user.nombre
      return false
    },
    getNombreComercial() {
      return this.$store.getters['user/getNombreComercial']
    }
  },
  mounted() { },
  methods: {
    logout() {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>