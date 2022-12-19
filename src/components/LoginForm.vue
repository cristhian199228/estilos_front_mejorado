<template>
  <div>
    <v-container v-if="!logueo">
      <v-row>
        <v-col cols="12" sm="6">
          <v-card class="mt-2" outlined color="transparent">
            <template>
              <v-img max-height="60vh" contain src="/app/portada.svg"></v-img>
            </template>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" align-self="center">
          <v-card outlined color="transparent" class="mx-auto mt-10" max-width="450">
            <v-card-text>
              <div class="text-center Titulo">¡Bienvenido!</div>
              <div class="mt-5 text-center Subtitulo">
                Al editor de promociones de la tarjeta Estilos
              </div>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn @click="iniciar()" class="red--text Boton rounded-lg" style="width: 150px" color="white">
                Iniciar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="logueo">
      <v-row>
        <v-col cols="12" sm="6">
          <v-card class="mt-2" outlined color="transparent"
          >
            <v-img max-height="60vh" contain src="/app/portada.svg"></v-img>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" align-self="center">
          <v-card outlined color="transparent" class="mx-auto" max-width="450">
            <v-card-text>
              <v-text-field v-model.trim="form.user" label="Codigo de Usuario" type="number" background-color="white"
                solo></v-text-field>
              <v-text-field v-model="form.password" label="RUC" type="password" background-color="white" solo>
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="ingresar()" class="red--text Boton ml-2 rounded-lg" style="width: 120px" color="white">
                Ingresar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- TODO arreglar validacion -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      logueo: false,
      form: {
        user: null,
        password: null,
      },
    };
  },
  methods: {
    ingresar() {
      this.$store.dispatch('user/login',this.form);
    },
    iniciar() {
      this.logueo = true;
    },
  },
  computed: {
  },
};
</script>
<style>
.Titulo {
  font-family: "AvertaExtraBold";
  color: white;
  font-size: 33px;
}

.Subtitulo {
  font-family: "AvenirRoman";
  color: white;
  font-size: 25px;
}

.Boton {
  font-family: "AvenirBlack";
  text-transform: capitalize;
  font-size: 35px;
}
</style>

