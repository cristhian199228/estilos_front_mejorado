<template>
  <div>
    <v-card>
      <v-card-text :id="divStage">
        <div :id="idContainer">
        </div>
      </v-card-text>
      <!-- <v-card-actions>
        <v-btn @click="savejson()">hola</v-btn>
      </v-card-actions> -->
    </v-card>
  </div>
</template>
<script>
import Konva from 'konva';
export default {
  props: {
    idContainer: String,
    editable: Boolean,
    divStage: String
  },
  data() {
    return {
      width: null,
      height: null,
      scale: null,
      precio: null,
      stage: null
    };
  },
  created() {
    window.addEventListener("resize", this.changeRect);
  },
  watch: {
    productos_promocion_text(value) {
      this.stage.findOne('#productos_promocion').text(value)
    },
    precio_promocion_text(value) {
      this.stage.findOne('#precio_promocion').text(value)
    },
    precio_promocion_font_style(value) {
      this.stage.findOne('#precio_promocion').fontStyle(value)
    },
    productos_promocion_font_style(value) {
      this.stage.findOne('#productos_promocion').fontStyle(value)
    },
    json(nuevo) {
      this.dibujarCanvas(nuevo);
      this.changeRect();
    }
  },
  async mounted() {
    await this.revisarContainer();
  },
  computed: {
    ruta_foto() {
      return this.$store.getters['foto/getRutaFoto']
    },
    productos_promocion_text() {
      return this.$store.state.promocion.productos_promocion.text
    },
    precio_promocion_text() {
      return this.$store.state.promocion.precio_promocion.text
    },
    precio_promocion_font_style() {
      return this.$store.state.promocion.precio_promocion.font_style
    },
    productos_promocion_font_style() {
      return this.$store.state.promocion.productos_promocion.font_style
    },
    json() {
      return this.$store.getters['promocion/getPlantillaSeleccionada']
    },
  },
  methods: {
    savejson() {
      var json = this.$store.state.promocion.stage.toJSON();
      console.log(json);
    },
    revisarContainer() {
      const container = document.querySelector('#' + this.divStage);
      this.width = container.clientWidth - 32;
      this.height = container.clientWidth - 32;
    },
    changeRect() {
      const container = document.querySelector('#' + this.divStage);
      if (!container) {
        return;
      }
      const width = container.clientWidth - 32;
      const scale = width / 500;
      this.stage.scale({ x: scale, y: scale });
      this.stage.width(this.width);
      this.stage.height(this.height);
    },
    async dibujarCanvas(json) {
      this.stage = Konva.Node.create(JSON.parse(json.json), this.idContainer);
      let me = this;

      var backgound = new Image();
      backgound.onload = function () {
        me.stage.findOne('#background').image(backgound);
      };
      backgound.src = this.ruta_foto;
      backgound.src = "http://192.168.1.64:8000/api/mostrarFoto/aa8e18837ab9d02cb082027c495178dc.jpg";

      var logo_estilos = new Image();
      logo_estilos.onload = function () {
        me.stage.findOne('#logo_estilos').image(logo_estilos);
        me.stage.findOne('#logo_estilos').draggable(me.editable);
      };
      logo_estilos.src = '/app/logo_estilos.svg';

      var logo_tarjeta_estilos = new Image();
      logo_tarjeta_estilos.onload = function () {
        me.stage.findOne('#logo_tarjeta_estilos').image(logo_tarjeta_estilos);
        me.stage.findOne('#logo_tarjeta_estilos').draggable(me.editable)
      };
      logo_tarjeta_estilos.src = '/app/logo_tarjeta_exclusivo.svg';

      me.stage.findOne('#rectangulo_logo_promocion').draggable(me.editable)
      me.stage.findOne('#rectangulo_promocion').draggable(me.editable)
      me.stage.findOne('#productos_promocion').draggable(me.editable)
      me.stage.findOne('#precio_promocion').draggable(me.editable)

      me.stage.findOne('#productos_promocion').text(me.productos_promocion_text)
      me.stage.findOne('#precio_promocion').text(me.precio_promocion_text)

      if (this.editable == true) {
        var tr = me.stage.findOne('#transformer');
        this.stage.on("click tap", function (e) {
          var currentShape = e.target;
          if (currentShape === this.stage || currentShape.attrs.name == 'background') {
            tr.nodes([]);
          } else {
            tr.nodes([currentShape]);
          }
        });
      }
    }

  }
};
</script>
