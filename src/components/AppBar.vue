<template>
  <div>
    <v-app-bar color="white" elevation="0" app>
      <v-app-bar-nav-icon @click="drawerState = !drawerState" v-if="mostrar_nav_icon"></v-app-bar-nav-icon>
      <!-- <v-app-bar-nav-icon @click="drawerState = !drawerState"></v-app-bar-nav-icon> -->
      <v-toolbar-title>
        <v-img max-height="30" class="ml-auto" contain src="/app/logo_estilos.svg"></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="getUser">
        <v-icon class=" mx-2" color="orange">mdi-store</v-icon>
        Hola , {{ getUser }}
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
      return this.$store.state.mostrar_nav_icon
    },
    getUser() {
      if (this.$store.state.user.user) return this.$store.state.user.user.nombre
      return false
    }
  },
  mounted() { },
  methods: {

  }
}
</script>