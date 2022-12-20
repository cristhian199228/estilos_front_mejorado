<template>
  <v-app id="inspire">
    <v-snackbar transition="scale-transition" top :color="snackbar.color" v-model="snackbar.show" timeout="3500">
      {{ snackbar.message }}
    </v-snackbar>
    <AppBar></AppBar>
    <NavigationDrawer></NavigationDrawer>
    <v-main>
      <div :id="fondoprincipal">
        <router-view></router-view>
      </div>
    </v-main>
    <FooterView></FooterView>
  </v-app>
</template>

<script>
import NavigationDrawer from './components/NavigationDrawer.vue';
import FooterView from './components/Footer.vue';
import AppBar from './components/AppBar.vue';
export default {
  components: { NavigationDrawer, FooterView, AppBar },
  data() {
    return {
      icons: ["mdi-facebook", "mdi-instagram", "mdi-youtube"],
    };
  },
  methods: {
  },
  computed: {
    fondoprincipal() {
      return this.$store.state.fondoprincipal
    },
    snackbar() {
      return this.$store.state.snackbar
    }
  },
  created() {
  },
};
</script>
<style>
@font-face {
  font-family: "AvertaExtraBold";
  src: local("AvertaExtraBold"),
    url(./fonts/AvertaExtraBold.otf) format("truetype");
}

@font-face {
  font-family: "AvenirRoman";
  src: local("AvenirRoman"),
    url(./fonts/AvenirLTStd-Roman.otf) format("truetype");
}

@font-face {
  font-family: "AvenirBlack";
  src: local("AvenirBlack"),
    url(./fonts/AvenirLTStd-Black.otf) format("truetype");
}

@font-face {
  font-family: "AvenirNextLTPro";
  src: local("AvenirNextLTPro"),
    url(./fonts/AvenirNextLTPro.otf) format("truetype");
}

@font-face {
  font-family: "Poppins-Regular";
  src: local("Poppins-Regular"),
    url(./fonts/Poppins-Regular.ttf) format("truetype");
}

@font-face {
  font-family: "Verdana";
  src: local("Verdana"),
    url(./fonts/verdana.ttf) format("truetype");
}

@font-face {
  font-family: "Cooper Black";
  src: local("Cooper Black"),
    url(./fonts/COOPBL.TTF) format("truetype");
}

@font-face {
  font-family: "Century Gothic";
  src: local("Century Gothic"),
    url(./fonts/GOTHIC.TTF) format("truetype");
}

.TopBar {
  font-family: "AvenirRoman";
  color: black;
  font-size: 14px;
}

.Menu {
  font-family: "AvenirRoman";
}

.Footer {
  font-family: "AvenirRoman";
}

#landing-page {
  background: rgb(247, 183, 43);
  background: linear-gradient(90deg,
      rgba(254, 154, 10, 1) 0%,
      rgba(214, 61, 26, 1) 100%);
  height: 100%;
}

#logueado {
  background: white;
  height: 100%;
}

.v-list .v-list-item--active {
  background-color: #f57c00;
  color: #ffffff !important;
  font-weight: bold;
}
</style>