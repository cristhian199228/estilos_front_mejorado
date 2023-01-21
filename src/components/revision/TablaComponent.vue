<template>
  <div>
    <v-card outlined class="mx-12">
      <v-card-title> Estado de Solicitudes</v-card-title>
      <v-card-text>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="4">
            <v-menu v-model="menu_inicio" :close-on-content-click="false" :nudge-right="40"
              transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="fecha_inicio_format" label="Fecha de Inicio" prepend-icon="mdi-calendar" readonly
                  v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="fecha_inicio" @input="menu_inicio = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="4">
            <v-menu v-model="menu_final" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
              offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="fecha_final_format" label="Fecha de Final" prepend-icon="mdi-calendar" readonly
                  v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="fecha_final" @input="menu_final = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
            <v-btn color="orange" class="ma-2 white--text" to="/inicio">
              Atras
          
            </v-btn>
            <v-btn color="red" class="ma-2 white--text" @click="getPromociones()">
              Consultar
              <v-icon right dark> mdi-magnify</v-icon>
            </v-btn>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-col>
            <v-data-table :items="promocion" dense :headers="headers" :items-per-page="15" hide-default-footer>
              <template v-slot:[`item.estado_solicitud`]="{ item }">
                <template v-if="item.estado_solicitud == 1">
                  <v-chip small v-bind="attrs" v-on="on" color="orange" dark>
                    REVISIÓN
                  </v-chip>
                </template>
                <template v-if="item.estado_solicitud == 2">
                  <v-chip small v-bind="attrs" v-on="on" color="green" dark>
                    APROBADO
                  </v-chip>
                </template>
                <template v-if="item.estado_solicitud == 3">
                  <v-chip small v-bind="attrs" v-on="on" color="red" dark>
                    NO APROBADO
                  </v-chip>
                </template>
              </template>
              <template v-slot:[`item.vista_previa`]="{ item }">
                <v-icon small v-bind="attrs" v-on="on" @click="abrirBitacora(item)">
                  mdi-file-find
                </v-icon>
              </template>
              <template v-slot:[`item.descargar`]="{ item }">
                <v-icon v-if="item.estado_solicitud == 2" small v-bind="attrs" v-on="on" class="mr-2"
                  @click="abrirBitacoraDescarga(item)">
                  mdi-download
                </v-icon>
                <v-icon v-else small v-bind="attrs" v-on="on" class="mr-2" disabled
                  @click="abrirBitacoraDescarga(item)">
                  mdi-download
                </v-icon>
              </template>
              <template v-slot:[`item.legales`]="{ item }">
                <v-icon small v-bind="attrs" v-on="on" class="mr-2" @click="descargarLegales(item)">
                  mdi-scale-balance
                </v-icon>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      opcionesEstadoSolicitud: [
        { title: 'Revisión', estado: "1" },
        { title: 'Aprobado', estado: "2" },
        { title: 'No aprobado', estado: "3" },
      ],
      headers: [
        { text: "F.Creación", value: "fecha", align: "start", sortable: false },
        { text: "Status", value: "estado_solicitud", sortable: false },
        { text: "Vista Previa", value: "vista_previa", sortable: false },
        { text: "Descargar", value: "descargar", sortable: false },
        { text: "Legales", value: "legales", sortable: false },
      ],
      menu_inicio: false,
      menu_final: false,
      fecha_inicio_format: this.formatDate(moment().format('YYYY-MM-DD')),
      fecha_final_format: this.formatDate(moment().format('YYYY-MM-DD')),
      fecha_inicio: moment().format('YYYY-MM-DD'),
      fecha_final: moment().format('YYYY-MM-DD'),
    };
  },
  async created() {
    this.getPromociones()
  },
  computed: {
    promocion() {
      return this.$store.state.promocion.promocion
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}-${month}-${year}`
    },
    async abrirBitacora(item) {
      this.$router.push({
        name: "Promocion",
        params: {
          promocion_id: item.id,
        },
      });
    },
    async abrirBitacoraDescarga(item) {
      await this.$store.commit("promocion/SET_PROMOCION_ID", item.id);
      this.$router.push({
        name: "DescargaPromocion",
        params: {
          promocion_id: item.id,
        },
      });
    },
    async getPromociones() {
      const data = {
        inicio: this.fecha_inicio,
        final: this.fecha_final
      }
      await this.$store.dispatch('promocion/getPromociones', data)
    },
    /*   descargarLegales(item) {
        const conf = confirm("Esta seguro de descargar los legales?");
        if (conf)
          window.open(this.ruta + "/api/v1/descargarLegales/" + item.id, "_blank");
      } */
  },
  watch: {
    fecha_inicio(value) {
      this.fecha_inicio_format = this.formatDate(value)
    },
    fecha_final(value) {
      this.fecha_final_format = this.formatDate(value)
    },
  },
};
</script>