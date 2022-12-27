<template>
  <div :id="divStage">
    <v-card>
      <v-card-text>
        <div :id="idContainer">
        </div>
      </v-card-text>
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
      stage: null,
      atributos: ['text', 'fontStyle', 'align', 'fill', 'fontFamily'],
      objetos: ['precio_promocion', 'productos_promocion', 'texto_establecimiento'],
      objetos_editables: ['rectangulo_logo_promocion', 'rectangulo_promocion', 'productos_promocion', 'precio_promocion']
    };
  },
  created() {
    window.addEventListener("resize", this.changeRect);
  },
  watch: {
    json(nuevo) {
      this.dibujarCanvas(nuevo);
      this.changeRect();
    },
    '$store.state.promocion.key_plantilla_seleccionada'() {
      this.dibujarCanvasPlantilla()
      this.changeRect();
    },
    '$store.state.promocion.descarga'() {
      this.exportarPromocion();
    },
    stage(value) {
      this.$store.state.promocion.stage = value
    },
    '$store.state.promocion.productos_promocion.text'(value) {
      this.stage.findOne('#productos_promocion').text(value)
    },
    '$store.state.promocion.productos_promocion.fontStyle'(value) {
      this.stage.findOne('#productos_promocion').fontStyle(value)
    },
    '$store.state.promocion.productos_promocion.align'(value) {
      this.stage.findOne('#productos_promocion').align(value)
    },
    '$store.state.promocion.productos_promocion.fill'(value) {
      this.stage.findOne('#productos_promocion').fill(value)
    },
    '$store.state.promocion.productos_promocion.fontFamily'(value) {
      this.stage.findOne('#productos_promocion').fontFamily(value)
    },
    '$store.state.promocion.precio_promocion.text'(value) {
      this.stage.findOne('#precio_promocion').text(value)
    },
    '$store.state.promocion.precio_promocion.fontStyle'(value) {
      this.stage.findOne('#precio_promocion').fontStyle(value)
    },
    '$store.state.promocion.precio_promocion.align'(value) {
      this.stage.findOne('#precio_promocion').align(value)
    },
    '$store.state.promocion.precio_promocion.fill'(value) {
      this.stage.findOne('#precio_promocion').fill(value)
    },
    '$store.state.promocion.precio_promocion.fontFamily'(value) {
      this.stage.findOne('#precio_promocion').fontFamily(value)
    },
    '$store.state.promocion.texto_establecimiento.text'(value) {
      this.stage.findOne('#texto_establecimiento').text(value)
    },
    '$store.state.promocion.texto_establecimiento.fontStyle'(value) {
      this.stage.findOne('#texto_establecimiento').fontStyle(value)
    },
    '$store.state.promocion.texto_establecimiento.align'(value) {
      this.stage.findOne('#texto_establecimiento').align(value)
    },
    '$store.state.promocion.texto_establecimiento.fill'(value) {
      this.stage.findOne('#texto_establecimiento').fill(value)
    },
    '$store.state.promocion.texto_establecimiento.fontFamily'(value) {
      this.stage.findOne('#texto_establecimiento').fontFamily(value)
    },
  },
  mounted() {
  },
  computed: {
    ruta_foto() {
      return this.$store.getters['promocion/getRutaFotoSeleccionada']
    },
    json() {
      return this.$store.state.promocion.promocion_seleccionada
    },
    json_plantilla() {
      return this.$store.getters['promocion/getPlantillaSeleccionada']
    },
  },
  methods: {
    changeRect() {
      const container = document.querySelector('#' + this.divStage);
      if (!container) {
        return;
      }
      var containerWidth = container.offsetWidth;
      var scale = (containerWidth - 30) / 500;
      this.stage.width(500 * scale);
      this.stage.height(500 * scale);
      this.stage.scale({ x: scale, y: scale });
    },
    establecerAtributos(target) {
      this.atributos.forEach(attr => this.$store.state.promocion[target][attr] = this.stage.findOne('#' + target).attrs[attr]);
    },
    establecerAtributosDesdePlantilla(target) {
      this.atributos.forEach(attr => this.stage.findOne('#' + target).setAttr(attr, this.$store.state.promocion[target][attr]))
    },
    async dibujarCanvas(json) {

      let me = this;
      me.stage = Konva.Node.create(JSON.parse(json.json), this.idContainer);

      var backgound = new Image();
      backgound.onload = function () {
        me.stage.findOne('#background').image(backgound);
      };
      backgound.setAttribute('crossOrigin', 'anonymous');
      backgound.src = me.ruta_foto;

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

      me.objetos_editables.forEach(attr => me.stage.findOne('#' + attr).draggable(me.editable));
      me.objetos.forEach(attr => me.establecerAtributos(attr));

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
    },
    async dibujarCanvasPlantilla() {

      let me = this;
      me.stage = Konva.Node.create(JSON.parse(me.json_plantilla.json), this.idContainer);

      var backgound = new Image();
      backgound.onload = function () {
        me.stage.findOne('#background').image(backgound);
      };
      backgound.setAttribute('crossOrigin', 'anonymous');
      backgound.src = me.ruta_foto;

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

      me.objetos_editables.forEach(attr => me.stage.findOne('#' + attr).draggable(me.editable));
      me.objetos.forEach(attr => me.establecerAtributosDesdePlantilla(attr));

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
    },
    async exportarPromocion() {
      var dataURL = this.stage.toDataURL({ pixelRatio: this.$store.state.promocion.res+1 });
      var link = document.createElement('a');
      link.download = 'prueba.' + this.$store.state.promocion.formato;
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  }
};
</script>
