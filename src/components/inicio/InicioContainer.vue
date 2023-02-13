<template>
  <div>
    <v-card class="mx-auto my-12" outlined color="transparent" max-width="800">
      <v-row>
        <v-col cols="12">
          <v-card outlined color="transparent" class="mx-6">
            <v-img src="/app/bannerinicio.svg" class="text align-end">
              <v-row>
                <v-spacer></v-spacer>
                <v-col cols="6" sm="4" xl="4">
                  <v-btn @click="validarIngreso()" class="rounded mb-2 mb-sm-10 mb-md-10" color="#ED1C24" dark>
                    <strong> Ingresa Aqui</strong>
                  </v-btn>
                </v-col>
              </v-row>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <v-card to="/inicio" class="mx-6" color="transparent" outlined>
            <v-img src="/app/bannerboton1.svg" to="/fotos">
            </v-img>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card to="/revision" class="mx-6" color="transparent" outlined>
            <v-img src="/app/bannerboton2.svg">
            </v-img>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card @click="abrirModalTerminos()" class="mx-6" color="transparent" outlined>
            <v-img src="/app/bannerboton3.svg">
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog v-model="dialog_terminos" width="80vw">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Términos y condiciones
        </v-card-title>
        <v-card-text>
          El Establecimiento Afiliado a la tarjeta Estilos, se compromete a utilizar la
          plataforma alojada en la página web https://www.tarjetaestilos.com.pe/ para fines específicos como creación
          de post para redes, no ocultando en ningún contexto los logos distintivos de la tarjeta Estilos y únicamente
          para las actividades realizadas por el Establecimiento Afiliado. No es aplicable para empresas vinculadas
          salvo se suscriba la solicitud de afiliación como Establecimiento Afiliado. El Establecimiento Afiliado
          autoriza a Estilos S.R.L. y COOPSE NF a publicar esta promoción a través de los diferentes canales
          publicitarios que manejan, Estilos S.R.L. y COOPSE NF no se hacen responsables por el incumplimiento de
          cualquiera de las condiciones y/o promociones publicadas por el Establecimiento Afiliado, incluidas
          omisiones, desperfectos o fallas en el producto o servicio. En caso de reclamos o quejas será el
          Establecimiento Afiliado a la tarjeta Estilos el único responsable, liberando a Estilos S.R.L. y COOPSE NF
          de cualquier responsabilidad. Tarjeta estilos se reserva el derecho de aceptar o rechazar la publicación de
          la promoción. Estilos S.R.L. y COOPSE NF se reservan el derecho de realizar acciones de inspección sobre el
          material publicitario generado, y de solicitar su supresión en caso que este afecte las normas de la moral,
          las buenas costumbres y que alteren el orden público, preservando la paz y la seguridad, así como el
          prestigio de las marcas de titularidad de Estilos S.R.L. y COOPSE NF, bajo responsabilidad del
          Establecimiento Afiliado. En caso de que el Establecimiento Afiliado agregue una foto o imagen para la
          generación del post, da su consentimiento para hacer uso de la imagen para la difusión de promociones de la
          tarjeta Estilos a través de medios digitales e impresos, y confirma que la foto o imagen es de su propiedad
          o autoría, liberando a Estilos S.R.L. y COOPSE NF de responsabilidad o reclamo posterior por derecho de
          autor.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog_terminos = false">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog_terminos: false,
    };
  },
  computed: {},
  methods: {
    abrirModalTerminos() {
      this.dialog_terminos = 1;
    },
    validarIngreso() {
      this.$store.commit('SHOW_NAVIGATION_DRAWER', true)
      this.$store.commit('SET_MOSTRAR_NAV_ICON', true)
      this.$store.commit('SET_INICIO_VALIDADO', true)
      this.$store.commit('SET_FOTOS_VALIDADO', true)
      this.$router.push("/fotos");
    },
  },
  created() {
  },
};
</script>